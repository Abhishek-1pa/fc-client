import { BlogGetData } from "@/models/BlogGet";
import { dislike, like } from "@/redux/blogs/blogFetchSlice";
import store, { RootState } from "@/redux/store";
import { ChatBubbleOutline, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import TagOutput from "../Tags/TagOutput";
import "./styles.css";
const BlogRenderer = () => {
  const blog: BlogGetData | null = useSelector(
    (state: RootState) => state.fetch_all_blogs.current_blog
  );

  const handleLike = () => {
    // Implement like functionality
    // console.log("user liked the blog");
    if (blog && blog.id) {
      store.dispatch(like(blog?.id));
    }
  };

  const handleDislike = () => {
    // Implement dislike functionality
    // console.log("user disliked the blog");
    if (blog && blog.id) {
      store.dispatch(dislike(blog.id));
    }
  };

  const handleComment = () => {
    // Implement comment functionality
  };

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1), // Adjust the padding to ensure consistent circular shape
    "& .MuiIconButton-root": {
      borderRadius: "50%", // Ensure circular shape
      width: "10px", // Ensure button size adapts to content
    },
  }));
  return (
    <Box marginTop={-1}>
      {blog ? (
        <Stack direction="row">
          <Stack
            spacing={2}
            sx={{ position: "fixed" }}
            marginY={10}
            marginX={1}
          >
            <Stack spacing={1} textAlign={"center"}>
              <StyledIconButton
                onClick={handleLike}
                sx={{ color: "rgb(6,95,212)" }}
              >
                <ThumbUp />
              </StyledIconButton>
              <Typography variant="body1" sx={{ color: "rgb(6,95,212)" }}>
                {blog.likes}
              </Typography>
              <StyledIconButton
                onClick={handleDislike}
                sx={{ color: "rgb(6,95,212)" }}
              >
                <ThumbDown />
              </StyledIconButton>
              <Typography variant="body1" sx={{ color: "rgb(6,95,212)" }}>
                {blog.dislikes}
              </Typography>
            </Stack>
            <StyledIconButton
              onClick={handleComment}
              sx={{ color: "rgb(6,95,212)" }}
            >
              <ChatBubbleOutline />
            </StyledIconButton>
          </Stack>

          {/* Blog content */}
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              // width={"100%"}
              width={"calc(100vw - 250px)"}
              sx={{ position: "fixed", backgroundColor: "#ffff" }}
            >
              <h1
                style={{
                  backgroundImage: `/images/im${blog.thumbnail_id + 1}.png`,
                }}
              >
                {blog.title}
              </h1>

              <TagOutput blog={blog} />
            </Stack>
            <div style={{ marginTop: 100, marginLeft: 60, marginRight: 40 }}>
              {/* <CKEditor 
            editor={null}
            data={blog.content}/>               */}
              <div
                style={{
                  marginTop: "20px",
                  fontFamily: "Arial, sans-serif", // Example font family
                  fontSize: "16px", // Example font size
                  color: "#333", // Example text color
                  lineHeight: "1.6", // Example line height
                  backgroundColor: "white", // Example background color
                  padding: "10px", // Example padding
                }}
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            </div>
            {/* <CustomEditor initialData={blog.content} /> */}

            {/* <EditorJsRenderer data={blog.content} /> */}

            <Stack></Stack>
          </Stack>
        </Stack>
      ) : (
        <p>Loading blog content...</p>
      )}
    </Box>
  );
};

export default BlogRenderer;
