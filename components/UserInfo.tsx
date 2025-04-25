import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { ChefHat, Heart } from "lucide-react";

export default async function UserInfo() {
  const session = await getSession();
  let user = null;
  if ((session as JWTPayload).id) {
    const res1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/users/user-info/${
        (session as JWTPayload).id
      }`
    );

    user = (await res1.json()).data;

    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/user-recipes/${
        (session as JWTPayload).id
      }`
    );

    user.totalRecipes = (await res2.json()).data.length;
  }

  return (
    <div className="flex gap-8 items-center mb-6">
      <Avatar className="size-48">
        <AvatarImage
          src={(user?.imageUrl as string) ?? "https://github.com/shadcn.png"}
          alt="@shadcn"
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
    </div>
  );
}
