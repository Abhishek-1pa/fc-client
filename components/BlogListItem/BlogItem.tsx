import React from 'react';
import { BlogPostData } from '@/models/BlogPost';
import { Paper, Typography, IconButton, ButtonGroup, Stack } from '@mui/material';
import Link from 'next/link';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BlogItem = ({ blog }: { blog: BlogPostData }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 2, m: 2 }}>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2} flex={1}>
          <Link href={`/blog/${blog.id}`} passHref>
            <Typography variant="h6">
              {blog.title}
            </Typography>
          </Link>
          {/* <Typography variant="body1">{blog.description}</Typography> */}
          <Typography variant="caption">By {blog.author} on {blog.published_at}</Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <ButtonGroup variant="outlined" color="primary">
            <IconButton aria-label="like">
              <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="dislike">
              <ThumbDownIcon />
            </IconButton>
          </ButtonGroup>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="views" disabled>
              <VisibilityIcon />
            </IconButton>
            <Typography variant="caption">{blog.views}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default BlogItem;
