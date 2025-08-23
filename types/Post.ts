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
  id: string;
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

// 백엔드에서 응답으로 받는 형태
export type PostRes = {
  id: number;
  photoUrl: string;
  title: string;
  category: string;
  question: Question[];
  memberId: number;
  memberNickName: string;
  authorCategorySeq: number;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
};

interface Question {
  question: string;
  content: string;
}
