import { OutputData } from "@editorjs/editorjs";
import { Tag } from "./Tag";

// models/BlogPost.ts
export interface BlogPostData {
  id?:number;
  title: string;
  content: OutputData;
  author?: string;
  published_at?: string;
  tags: Tag[];
  image?: File; // Image file for the blog post
  views?: number;
  likes?: number;
  dislikes?:number;
  comments?: string[];
}

