import BlogRenderer from "@/components/BlogRenderer/BlogRenderer";
import { setCurrentBlog } from "@/redux/blogs/blogFetchSlice";
import store, { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BlogPost = () => {
  const router = useRouter();
  const {slug} = router.query;
  const blogs = useSelector((state: RootState)=>state.fetch_all_blogs.blogs);

  function fetchBlogBySlug(slug: string | string[] | undefined) {
    if (!slug){
      return undefined;
  
    }
    
    const matchedBlog = blogs?.find((blog)=>blog.id === Number(slug));
    return matchedBlog;
  }
  
  useEffect(()=>{

    const currentBlog = fetchBlogBySlug(slug);
    store.dispatch(setCurrentBlog(currentBlog));

  },[slug]);
  

  return <>{<BlogRenderer />}</>;
};

export default BlogPost;

