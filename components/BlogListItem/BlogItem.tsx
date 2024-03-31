import { BlogPostData } from "@/models/BlogPost";
import { fetchAllBlogs, setCurrentBlog } from "@/redux/blogs/blogFetchSlice";
import { deleteBlog } from "@/redux/blogs/blogsCreateSlice";
import store, { RootState } from "@/redux/store";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  IconButtonProps,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlogItem = ({ blog }: { blog: BlogPostData }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Handle delete functionality
    // Implement your delete logic here
    if (blog && blog.id)
      store
        .dispatch(deleteBlog(blog.id))
        .then((response) => {
          console.log(response);
          store.dispatch(fetchAllBlogs());
        })
        .catch((error) => console.log(error));
    setOpenConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleBlogClick = () => {
    router.push(`/blog/${blog.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "250px",
          height: "290px",
          margin: 2,
        }}
        onClick={() => store.dispatch(setCurrentBlog(blog))}
      >
        <CardMedia
          component="img"
          height="200px"
          image={`images/im${blog.thumbnail_id + 1}.png`}
          alt={blog.title}
          // style={{objectFit:"none"}}
        />

        <CardContent></CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <h4
            style={{
              margin: 5,
              cursor: "pointer",
              overflow: "hidden",
              width: "180px",
            }}
            onClick={handleBlogClick}
          >
            {blog.title}
          </h4>

          {auth.user && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                onClick={handleDeleteClick}
                aria-label="delete"
                sx={{ marginRight: 1 }}
              >
                <Delete />
              </IconButton>
              <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete?</DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseConfirmation} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    color="primary"
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <IconButton
                onClick={() => {
                  // Handle update functionality
                }}
                aria-label="update"
              >
                <Link href="/blog/edit">
                  <Edit />
                </Link>
              </IconButton>
            </div>
          )}
        </Stack>
      </Card>
    </div>
  );
};

export default BlogItem;
