import { BlogPostData } from "@/models/BlogPost";
import { ChatBubbleOutline, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  styled
} from "@mui/material";
import EditorJsRenderer from "../EditorJsRenderer/EditorJsRenderer";
import TagOutput from "../Tags/TagOutput";

const BlogRenderer = ({ blog }: { blog: BlogPostData | null }) => {
  const handleLike = () => {
    // Implement like functionality
  };

  const handleDislike = () => {
    // Implement dislike functionality
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
    <Box textAlign="center" marginTop={-1}>
      {blog ? (
        <Stack direction="row">
          <Stack
            spacing={2}
            sx={{ position: "fixed" }}
            marginY={10}
            marginX={1}
          >
            <Stack spacing={1}>
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
              justifyContent="space-around"
              alignItems="center"
              width={"100%"}
              sx={{ position: "fixed", backgroundColor: "#ffff" }}
            >
              <h1>{blog.title}</h1>
              <TagOutput blog={blog} />
            </Stack>
            <div style={{ marginTop: 100, marginLeft: 60, marginRight: 40 }}>

              <EditorJsRenderer data={blog.content} />
            </div>
          </Stack>

        </Stack>
      ) : (
        <p>Loading blog content...</p>
      )}
    </Box>
  );
};

export default BlogRenderer;
