import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import TagInput from "@/components/Tags/TagInput";
import { TOKEN } from "@/constants/names";
import type { NextPage } from "next";
import { OutputData } from "@editorjs/editorjs";
import { BlogPostData } from "@/models/BlogPost";
import store from "@/redux/store";
import { Tag } from "@/models/Tag";
import { createBlog } from "@/redux/blogs/blogsCreateSlice";

const EditorBlock = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const router = useRouter();

  // Initialize state values
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    content: {
      blocks: []
    },
    tags: [],
  });
  
  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) router.push("/login");
  }, []);

  // Handle title change event
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  };

  // Handle saving editor data
  const handleSave = () => {
    console.log(formData); // Save or send data to backend
    store.dispatch(createBlog(formData)).then((response)=>console.log(response)).catch((error)=>console.log(error));
  };

  // Handle editor data change
  const handleEditorDataChange = (data: OutputData) => {
    setFormData((prevData)=>({
      ...prevData,
      content:data
    }));
  };

  // Handle tag change
  const handleTagChange = (tags: Tag[]) => {
    setFormData({ ...formData, tags });
  };

  const styles ={
    "& .MuiInputLabel-root": { color: "black" }, // Color for label
    "& .MuiOutlinedInput-root": { // Style for entire input field
      "&.Mui-focused fieldset": { borderColor: "black" }, // Focused state border color
      "& .MuiInputBase-input": { color: "black" }, // Color for input text
    },
  }

  return (
    <>
      <Stack  spacing={2} width={"80%"} margin={"auto"}>
  
          <TextField
            fullWidth
            size="small"
            sx={ styles }
            label="Title"
            value={formData.title}
            onChange={handleTitleChange}
          />

      <Stack direction="row" width="100%" justifyContent="space-around">
        <EditorBlock
          data={formData.content}
          onChange={handleEditorDataChange}
          holder="editorjs-container"
          
          maxWidth="100%"
        />
      </Stack>
      <TagInput handleTagChange={handleTagChange} selectedTags={formData.tags} />
      <Stack alignItems="center">
        <Button onClick={handleSave}>Save</Button>
      </Stack>
      </Stack>
    </>
  );
};


export default Home;
