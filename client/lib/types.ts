export type Recipe = {
  _id: string;
  name: string;
  category: string;
  keywords: string[];
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  likesCount: number;
  comments: Comment[];
  instructions: string[];
  ingredients: Ingredient[];
  createdBy: string;
  isPopular: boolean;
  likedUsers: string[];
};

export type Ingredient = {
  name?: string | undefined;
  quantity?: string | undefined;
};

export type UserSessionInfo = {
  id: string;
  role: "customer" | "admin";
  fullName: string;
  imageUrl: string;
};

export type UserAccountInfo = {
  fullName: string;
  imageUrl: string;
  bio: string;
  bookmarks: string[];
};

export type UserInfo = {
  _id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  bio: string;
  role: string;
  bookmarks: string[];
  userLikeCount: Number;
  creditPoints: Number;
};

export type createdBy = {
  _id: string;
  fullName: string;
  imageUrl: string;
};

export type Comment = {
  commentedBy: createdBy;
  comment: string;
  _id: string;
  createdAt: string;
};

export type RecipePublicView = {
  _id: string;
  name: string;
  category: string;
  keywords: string[];
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  likesCount: number;
  comments: Comment[];
  instructions: string[];
  ingredients: Ingredient[];
  createdBy: createdBy;
  isPopular: boolean;
  likedUsers: string[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
  imageUrl: string;
  unit: string;
};
