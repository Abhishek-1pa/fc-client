import { BlogGetData } from '@/models/BlogGet'
import { BlogPostData } from '@/models/BlogPost'
import { Stack, Chip, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const TagOutput = ({blog}:{blog:BlogGetData}) => {

  return (
    
    <div>
    {blog.tags.length > 0 && (
      <div>
        {/* <h1>Tags</h1> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {blog.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={
                <Typography variant="subtitle1">
                  {tag.text}
                </Typography>
              }
              variant="outlined"
              style={{ margin: "4px", borderRadius: 0 }}
            />
          ))}
        </Stack>
      </div>
    )}
  </div>
  )
}

export default TagOutput