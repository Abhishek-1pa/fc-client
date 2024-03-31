import { Link, Stack, Typography } from '@mui/material';
import React from 'react'

const Trending = () => {

const trendingData = [
  {
    id: 1,
    title: "Top 5 JavaScript Frameworks in 2022",
    author: "John Doe",
    thumbnail: "https://example.com/thumbnail1.jpg",
    date: "2022-10-01",
    likes: 100,
    comments: 20
  },
  {
    id: 2,
    title: "10 Tips for Effective React Development",
    author: "Jane Smith",
    thumbnail: "https://example.com/thumbnail2.jpg",
    date: "2022-09-15",
    likes: 80,
    comments: 15
  },
  {
    id: 3,
    title: "Introduction to Machine Learning with Python",
    author: "Sam Johnson",
    thumbnail: "https://example.com/thumbnail3.jpg",
    date: "2022-09-01",
    likes: 120,
    comments: 25
  }
];
return (
  <Stack sx={{ position: "fixed", marginTop: "50px", backgroundColor: "azure", height: "100%", maxWidth: "250px" }} spacing={2}>
    <Typography variant="h6" align="center">Trending Blogs</Typography>
    {trendingData.map(blog => (
      <div key={blog.id} style={{margin:"5px"}}>
        {/* Use Link component to make the title clickable */}
        <Link href="#" color="primary" underline="hover" sx={{ fontWeight: 'bold' }}>{blog.title}</Link>
      </div>
    ))}
  </Stack>
);
    }

export default Trending;