import TagInput from "@/components/Tags/TagInput";
import ThumbnailUploader from "@/components/ThumbnailUploader/ThumbnailUploader";
import { TOKEN } from "@/constants/names";
import { BlogPostData } from "@/models/BlogPost";
import { createBlog, updateBlog } from "@/redux/blogs/blogsCreateSlice";
import store, { RootState } from "@/redux/store";
import { OutputData } from "@editorjs/editorjs";
import { Button, Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tag } from "react-tag-input";

const EditorBlock = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

const Edit: NextPage = () => {
  const router = useRouter();
  const currentBlog = useSelector((state: RootState)=>state.fetch_all_blogs.current_blog);

  // Initialize state values
  const [formData, setFormData] = useState<BlogPostData>({
    title: currentBlog?.title ?? '',
    content: currentBlog?.content ?? {
        blocks:[]
    },
    tags: currentBlog?.tags ?? [],
    thumbnail_id: currentBlog?.thumbnail_id ?? 1
  });
  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) router.push("/login");
  }, []);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  // Handle title change event
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  };

  // Handle saving editor data
  const handleUpdate = () => {
    // console.log(formData); // Log the current form data

    // Map the tags to extract only the 'text' property
    const updatedTags = formData.tags.map((tag) => tag.text);

    let uploadData: BlogPostData = {
        id: currentBlog?.id,
      title: formData.title,
      content: formData.content,
      tags: updatedTags,
      thumbnail_id: formData.thumbnail_id
    };

    // console.log(uploadData);

    // Dispatch the createBlog action when the save button is clicked
    store
      .dispatch(updateBlog(uploadData)).then(resp=>{
        router.push("/");
      });
  };

  // Handle editor data change
  const handleEditorDataChange = (data: OutputData) => {
    setFormData((prevData) => ({
      ...prevData,
      content: data,
    }));
  };

  const appendEditorData = (data: OutputData): OutputData => {
    const updatedContent: OutputData = {
      ...formData.content,
      blocks: [...formData.content.blocks, ...data.blocks],
    };

    setFormData((prev) => ({
      ...prev,
      content: updatedContent,
    }));

    return updatedContent;
  };

  // Handle tag change
  const handleTagChange = (tags: Tag[]) => {
    setFormData({ ...formData, tags });
  };


  const styles = {
    "& .MuiInputLabel-root": { color: "black" }, // Color for label
    "& .MuiOutlinedInput-root": {
      // Style for entire input field
      "&.Mui-focused fieldset": { borderColor: "black" }, // Focused state border color
      "& .MuiInputBase-input": { color: "black" }, // Color for input text
    },
  };

  const handleImageChange = (index: number) => {
    setFormData((prev)=>({
      ...prev,
      thumbnail_id: index
    }))

    // console.log(index);



  };

  return (
    <>
      <Stack spacing={2} width={"80%"} margin={"auto"}>
        <TextField
          fullWidth
          size="small"
          sx={styles}
          label="Title"
          value={formData.title}
          onChange={handleTitleChange}
        />

        <Stack direction="row" width="100%" justifyContent="space-around">
          <EditorBlock
            data={formData.content}
            onChange={handleEditorDataChange}
            append={appendEditorData}
            holder="editorjs-container"
            maxWidth="100%"
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
        <TagInput
          handleTagChange={handleTagChange}
          selectedTags={formData.tags}
        />
        </Stack>
        <ThumbnailUploader handleImageChange={handleImageChange} thumbnail_id={formData.thumbnail_id}/>
        
        <Stack alignItems="center">
          <Button onClick={handleUpdate}>Update</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Edit;
