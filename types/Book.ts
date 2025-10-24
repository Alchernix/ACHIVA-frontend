import type { Category } from "./Categories";

export type Book = { 
  id: number; 
  title: string; 
  category: Category;
  count: number; 
  color: string;
  image: string;
};
