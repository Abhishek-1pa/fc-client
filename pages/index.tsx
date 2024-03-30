import BlogItem from "@/components/BlogListItem/BlogItem";
import { BlogFetchAllState } from "@/models/states/blogFetchAllState";
import { fetchAllBlogs } from "@/redux/blogs/blogFetchSlice";
import store, { RootState } from "@/redux/store";
import { Button, Grid, IconButton, Link, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';

const HomePage = () => {
  const {blogs, loading , error} : BlogFetchAllState = useSelector((state: RootState)=>state.fetch_all_blogs);
  useEffect(()=>{

    store.dispatch(fetchAllBlogs());
  },[])

  return (
    <>

    <Stack spacing={2}>

      <Stack direction={"row"}>
        <Stack>
        {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p>Error fetching blogs: {error.message}</p>
      ) : (
        <Grid container spacing={1} > {/* Wrap blogs in a Grid container */}
          {blogs && blogs.map((blog, index) => (
            <Grid 
            // item xs={3} 
            key={blog.id}> {/* Render each blog item with xs={4} width for 3-column grid */}
              <BlogItem blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}

        </Stack>


      </Stack>

    </Stack>
    <Link href={"blog/create"}>
    <Stack sx={{ position: 'fixed', bottom: 30, right: 30 }}>
            <IconButton color="primary"> {/* Set color for filled button */}
              <PostAddSharpIcon fontSize="large" fill="currentColor" /> {/* Use currentColor for fill */}
            </IconButton>
          </Stack>
    </Link>

    </>
  );
};


export default HomePage;
