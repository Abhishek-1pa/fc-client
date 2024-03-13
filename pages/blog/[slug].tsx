import BlogRenderer from "@/components/BlogRenderer/BlogRenderer";
import { BlogPostData } from "@/models/BlogPost";
import { fetchById, selectBlogById } from "@/redux/blogs/blogFetchSlice";
import store, { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BlogPost = ({ blog }: { blog: BlogPostData }) => {
  const router = useRouter();

  return <>{blog && <BlogRenderer blog={blog} />}</>;
};

export default BlogPost;

export async function getServerSideProps(context: { params: { slug: any } }) {
  const { slug } = context.params;

  try {
    // Fetch blog data using the slug
    const response = await store.dispatch(fetchById(Number(slug)));

    // Pass the fetched data as props to the component
    return {
      props: {
        blog: response.payload, // Assuming payload contains the blog data
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        blog: null,
      },
    };
  }
}
