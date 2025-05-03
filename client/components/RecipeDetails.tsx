"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Clock,
  Users,
  ChefHat,
  Bookmark,
  BookmarkCheck,
  Heart,
  MessageSquare,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Recipe } from "@/lib/types";
// import { toast } from "@/components/ui/use-toast";

// Mock data for demonstration - replace with actual data fetching
// const fetchRecipe = async (id: string) => {
//   // This would be replaced with an actual API call
//   return {
//     _id: id,
//     name: "Creamy Garlic Parmesan Pasta",
//     category: "Pasta",
//     instructions: [
//       "Bring a large pot of salted water to a boil.",
//       "Cook pasta according to package instructions until al dente.",
//       "Meanwhile, in a large skillet, melt butter over medium heat.",
//       "Add minced garlic and sauté until fragrant, about 1 minute.",
//       "Pour in heavy cream and bring to a simmer.",
//       "Add grated Parmesan cheese and stir until melted and sauce is smooth.",
//       "Drain pasta and add to the sauce, tossing to coat.",
//       "Season with salt, pepper, and red pepper flakes to taste.",
//       "Garnish with chopped parsley and additional Parmesan cheese before serving.",
//     ],
//     keywords: ["pasta", "italian", "creamy", "quick", "vegetarian"],
//     ingredients: [
//       { name: "Fettuccine pasta", quantity: "8 oz" },
//       { name: "Butter", quantity: "2 tbsp" },
//       { name: "Garlic, minced", quantity: "4 cloves" },
//       { name: "Heavy cream", quantity: "1 cup" },
//       { name: "Parmesan cheese, grated", quantity: "1 cup" },
//       { name: "Salt", quantity: "to taste" },
//       { name: "Black pepper", quantity: "to taste" },
//       { name: "Red pepper flakes", quantity: "1/4 tsp (optional)" },
//       { name: "Fresh parsley, chopped", quantity: "2 tbsp" },
//     ],
//     time: "30 minutes",
//     servings: 4,
//     difficulty: "Easy",
//     imageUrl: "/placeholder.svg?height=500&width=800",
//     createdBy: {
//       _id: "user123",
//       name: "Chef Maria",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     likesCount: 124,
//     comments: [
//       {
//         _id: "comment1",
//         commentedBy: {
//           _id: "user456",
//           name: "John Doe",
//           avatar: "/placeholder.svg?height=40&width=40",
//         },
//         comment:
//           "Made this last night and it was delicious! I added some grilled chicken on top.",
//       },
//       {
//         _id: "comment2",
//         commentedBy: {
//           _id: "user789",
//           name: "Sarah Smith",
//           avatar: "/placeholder.svg?height=40&width=40",
//         },
//         comment: "Perfect weeknight dinner! So creamy and flavorful.",
//       },
//     ],
//     likedUsers: ["user456", "user789"],
//     isPopular: true,
//   };
// };

type Props = {
  recipe: Recipe;
};

export default function RecipeDetails({ recipe }: Props) {
  const router = useRouter();
  //   const [recipe, setRecipe] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [likesCount, setLikesCount] = useState(0);

  // Mock current user ID - would come from auth context in a real app
  const currentUserId = "user123";

  //   useEffect(() => {
  //     const loadRecipe = async () => {
  //       try {
  //         const data = await fetchRecipe(id);
  //         setRecipe(data);
  //         setLikesCount(data.likesCount);
  //         setIsLiked(data.likedUsers.includes(currentUserId));
  //         // In a real app, you would check if the recipe is bookmarked by the user
  //         setIsBookmarked(false);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error loading recipe:", error);
  //         // toast({
  //         //   title: "Error",
  //         //   description: "Failed to load recipe details",
  //         //   variant: "destructive",
  //         // });
  //         setLoading(false);
  //       }
  //     };

  //     loadRecipe();
  //   }, [id, currentUserId]);

  const handleLike = async () => {
    try {
      // In a real app, you would make an API call to like/unlike the recipe
      setIsLiked(!isLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

      //   toast({
      //     title: isLiked ? "Removed like" : "Recipe liked",
      //     description: isLiked
      //       ? "You've removed your like from this recipe"
      //       : "You've liked this recipe",
      //   });
    } catch (error) {
      console.error("Error liking recipe:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to like recipe",
      //     variant: "destructive",
      //   });
    }
  };

  const handleBookmark = async () => {
    try {
      // In a real app, you would make an API call to bookmark/unbookmark the recipe
      setIsBookmarked(!isBookmarked);

      //   toast({
      //     title: isBookmarked ? "Removed bookmark" : "Recipe bookmarked",
      //     description: isBookmarked
      //       ? "You've removed this recipe from your bookmarks"
      //       : "You've bookmarked this recipe for later",
      //   });
    } catch (error) {
      console.error("Error bookmarking recipe:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to bookmark recipe",
      //     variant: "destructive",
      //   });
    }
  };

  //   const handleComment = async () => {
  //     if (!comment.trim()) return;

  //     try {
  //       // In a real app, you would make an API call to add a comment
  //       const newComment = {
  //         _id: `comment${Date.now()}`,
  //         commentedBy: {
  //           _id: currentUserId,
  //           name: "You",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //         },
  //         comment: comment,
  //       };

  //       setRecipe({
  //         ...recipe,
  //         comments: [...recipe.comments, newComment],
  //       });

  //       setComment("");

  //       //   toast({
  //       //     title: "Comment added",
  //       //     description: "Your comment has been added to the recipe",
  //       //   });
  //     } catch (error) {
  //       console.error("Error adding comment:", error);
  //       //   toast({
  //       //     title: "Error",
  //       //     description: "Failed to add comment",
  //       //     variant: "destructive",
  //       //   });
  //     }
  //   };

  if (!recipe) {
    return <div className="text-center py-12">Recipe not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={
            recipe.imageUrl.startsWith("/")
              ? `${process.env.NEXT_PUBLIC_API}${recipe.imageUrl}`
              : recipe.imageUrl
          }
          alt={recipe.name}
          className="object-cover w-full h-[400px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="space-y-2">
            {recipe.isPopular && (
              <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {recipe.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={"/placeholder.svg"} alt={"als"} />
            <AvatarFallback>{"A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Recipe by</p>
            <p className="text-sm text-muted-foreground">{"B"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={isLiked ? "text-red-500" : ""}
            onClick={handleLike}
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500" : ""}`}
            />
            {likesCount}
          </Button>
          <Button variant="outline" size="sm" onClick={handleBookmark}>
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 mr-2 fill-primary" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Category and Keywords */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {recipe.keywords.map((keyword: string) => (
            <Badge key={keyword} className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Instructions */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="space-y-4 list-decimal list-inside">
            {recipe.instructions.map((instruction: string, index: number) => (
              <li key={index}>
                {/* <span className="font-medium mr-2">{index + 1}.</span> */}
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        {/* Ingredients */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient: any, index: number) => (
                <li key={index} className="flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Comments ({recipe.comments.length})
        </h2>

        {/* Add Comment */}
        <div className="flex gap-4 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Your avatar"
            />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Share your thoughts or tips about this recipe..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
            />
            <Button
              size="sm"
              //   onClick={handleComment}
              disabled={!comment.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        {/* <div className="space-y-4">
          {recipe.comments.map((comment: any) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={comment.commentedBy.avatar || "/placeholder.svg"}
                  alt={comment.commentedBy.name}
                />
                <AvatarFallback>
                  {comment.commentedBy.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium text-sm">
                    {comment.commentedBy.name}
                  </p>
                  <p className="text-sm mt-1">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
