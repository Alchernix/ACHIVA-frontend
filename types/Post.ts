import type { Category } from "./Categories";

export type Post = {
  titleImageUrl: string;
  title: string;
  category: Category;
  backgroundColor: BackgroundColor;
  pages: PostPage[];
};

export type DraftPost = Partial<Post> & {
  categoryCount?: number;
}; // 글쓰기 중 타입

export type PostPage = {
  subtitle?: string;
  content: string;
};

export type CategoryCount = {
  category: Category;
  count: number;
};

export type BackgroundColor =
  | "#ffffff"
  | "#000000"
  | "#412A2A"
  | "#A6736F"
  | "#4B5373"
  | "#525D49";
