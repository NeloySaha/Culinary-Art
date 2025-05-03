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
};

export type Ingredient = {
  name?: string | undefined;
  quantity?: string | undefined;
};

export type Comment = {
  commentedBy: string;
  comment: string;
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
