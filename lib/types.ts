export type Recipe = {
  _id: string;
  name: string;
  category: string;
  keywords: string[];
  time: string;
  servings: number;
  difficulty: string;
  imageUrl: string;
  likesCount: number;
  comments: Comment[];
  instructions: string[];
  ingredients: string[];
  createdBy: string;
};

export type Comment = {
  commentedBy: string;
  comment: string;
};
