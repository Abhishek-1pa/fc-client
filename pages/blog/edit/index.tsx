"use client";
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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Tag } from "react-tag-input";

// const EditorBlock = dynamic(() => import("@/components/Editor/Editor"), {
//   ssr: false,
// });

const CustomEditor = dynamic(
  () => {
    return import("@/components/Editor/ckeditor");
  },
  { ssr: false }
);

const Edit: NextPage = () => {
  const router = useRouter();
  const currentBlog = useSelector((state : RootState)=>state.fetch_all_blogs.current_blog)
  // Initialize state values
  const [formData, setFormData] = useState<BlogPostData>({
    title: currentBlog?.title|| "",
    content: currentBlog?.content || "",
    tags: currentBlog?.tags || [],
    thumbnail_id: currentBlog?.thumbnail_id || 0,
  });

  const editorRef = useRef(null);

  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) router.push("/login");
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  };

  // Handle saving editor data
  const handleSave = () => {
    console.log(formData); // Log the current form data

    // Map the tags to extract only the 'text' property
    const updatedTags = formData.tags.map((tag) => tag.text);

    let uploadData: BlogPostData = {
      id:currentBlog?.id,
      title: formData.title,
      content: formData.content,
      tags: updatedTags,
      thumbnail_id: formData.thumbnail_id,
    };

    console.log(uploadData);

    // Dispatch the createBlog action when the save button is clicked
    store
      .dispatch(updateBlog(uploadData))
      .then((response) => {
        console.log(response); // Log the response if dispatch is successful
      })
      .catch((error) => {
        console.log(error); // Log any errors encountered during dispatch
      });
  };

  // Handle editor data change
  const handleEditorDataChange = (data: string) => {
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
    setFormData((prev) => ({
      ...prev,
      thumbnail_id: index,
    }));

    console.log(index);
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
        <CustomEditor
          updateContent={handleEditorDataChange}
          initialData={formData.content}
        />

        <Stack direction={"row"} justifyContent={"space-between"}>
          <TagInput
            handleTagChange={handleTagChange}
            selectedTags={formData.tags}
          />
        </Stack>
        <ThumbnailUploader
          handleImageChange={handleImageChange}
          thumbnail_id={formData.thumbnail_id}
        />

        <Stack alignItems="center">
          <Button onClick={handleSave}>Save</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Edit;
