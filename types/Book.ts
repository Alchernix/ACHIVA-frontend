import type { Category } from "./Categories";

export type Book = {
  id: number;
  title: string;
  category: Category | undefined;
  count: number;
  color: string;
};
