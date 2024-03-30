import BlogRenderer from "@/components/BlogRenderer/BlogRenderer";
import { useRouter } from "next/router";

const BlogPost = () => {
  const router = useRouter();

  return <>{<BlogRenderer />}</>;
};

export default BlogPost;
