import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { ChefHat, Heart } from "lucide-react";
import { cookies } from "next/headers";

export default async function UserInfo() {
  const token = (await cookies()).get("session")?.value;
  let user = null;
  if (token) {
    const res1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/users/user-info`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res1.json();
    if (data.success) {
      user = data.data;
      user.totalRecipes = data.userRecipes.length;
    }
  }

  if (user === null) return <h1>User not found :(</h1>;

  return (
    <div>
      <div className="flex items-center gap-8 mb-6">
        <Avatar className="size-28 md:size-36 lg:size-44 border-2 border-primary">
          <img
            src={
              user.imageUrl.startsWith("/")
                ? `${process.env.NEXT_PUBLIC_API}${user.imageUrl}`
                : user.imageUrl
            }
            alt={`${user.fullName}`}
            className="object-cover"
          />
          <AvatarFallback>
            {(user?.fullName as string).split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{user.fullName}</h3>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="flex justify-around">
          <div className="flex gap-2 items-center">
            <ChefHat className="h-10 w-10 text-primary" />
            <div className="text-5xl">
              {user.totalRecipes}
              <span className="text-sm text-muted-foreground">Recipes</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Heart className="h-10 w-10 text-primary" />
            <div className="text-5xl">
              {user.userLikeCount}
              <span className="text-sm text-muted-foreground">Likes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
