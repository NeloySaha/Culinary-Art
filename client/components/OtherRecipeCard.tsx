"use client";
import { Clock, Eye, Heart, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

import { Recipe } from "@/lib/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Img from "./Img";

type Props = {
  recipe: Recipe;
};

export default function OtherRecipeCard({ recipe }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    try {
      const token = Cookies.get("session");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/delete-recipe/${recipe._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        router.refresh();
        toast.success("Success!", {
          description: "Your recipe has been uploaded successfully",
        });
      } else {
        toast.error("Error!", {
          description: data.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: (error as Error).message,
      });
    }
  }

  return (
    <Card>
      <CardContent className="flex space-y-0 space-x-4">
        <div className="relative">
          <Badge className="absolute top-1 left-1 uppercase z-10 bg-amber-300 text-foreground rounded-full text-xs">
            {recipe.category}
          </Badge>
          <div className="w-24 h-24">
            <Img
              src={
                recipe.imageUrl.startsWith("/")
                  ? `${process.env.NEXT_PUBLIC_API}${recipe.imageUrl}`
                  : recipe.imageUrl
              }
              alt={`${recipe.name} image`}
              className={`rounded-md object-cover w-24 h-24`}
              skeletonClassName="w-24 h-24"
            />
          </div>
        </div>

        <div className="min-h-24 flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h3 className={"tracking-wide text-sm font-semibold text-wrap"}>
              {recipe.name}
            </h3>
          </div>

          <div className="text-xs flex gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-auto ">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4  text-primary/75" />
              <p className="text-xs">
                {recipe.likedUsers.length}
                {/* <span className="text-xs text-muted-foreground font-normal ml-1">
              / 5
            </span> */}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4  text-primary/75" />
              <p className="text-xs">
                {recipe.comments?.length ?? 0}
                {/* <span className="text-xs text-muted-foreground font-normal ml-1">
              / 5
            </span> */}
              </p>
            </div>
            <Button
              asChild
              className="w-[140px] rounded-full text-xs"
              size={"sm"}
            >
              <Link href={`/view-recipe/${recipe._id}`}>
                <Eye className="w-4 h-4" /> View
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
