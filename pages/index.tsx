import BlogItem from "@/components/BlogListItem/BlogItem";
import BlogRenderer from "@/components/BlogRenderer/BlogRenderer";
import { BlogPostData } from "@/models/BlogPost";
import { BlogFetchAllState } from "@/models/states/blogFetchAllState";
import { fetchAllBlogs } from "@/redux/blogs/blogFetchSlice";
import store, { RootState } from "@/redux/store";
import blogsecure from "@/services/blogSecure";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const {blogs, loading , error} : BlogFetchAllState = useSelector((state: RootState)=>state.fetch_all_blogs);
  useEffect(()=>{

    store.dispatch(fetchAllBlogs()).then((response)=>console.log(response)).catch((error)=>console.log(error));
  },[])

  return (
    <>
      {blogs && (
        blogs.map((blog, index)=><BlogItem blog={blog} key={blog.id}/>)
      )}
    </>
  );
};

export default HomePage;
