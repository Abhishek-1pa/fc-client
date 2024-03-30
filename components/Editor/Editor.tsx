//./components/Editor
import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import { Button, Stack, TextField } from "@mui/material";
import llmsecure from "@/services/llmSecure";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  append(val:OutputData):OutputData;
  holder: string;
  maxWidth?:string;
};

const EditorBlock = ({ data, onChange, append,  holder, maxWidth }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS | null>(null);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        minHeight:200,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        }
      });
  
      ref.current = editor;
    }
    console.log("triggered")
    
  

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
   
  }, []);

  const handleGenerateClick = async () => {

    try {
      console.log(prompt);
      const response = await llmsecure.post("/llm/generate", { prompt });
      console.log(response.data);
      let new_content : OutputData = response.data;
      let x : OutputData= append(new_content);
      if (ref.current && new_content) {
       
          ref.current.blocks.render(x);
        

      }
  
    } catch (error) {
      console.log(error);
      // Handle error here
    }

  };

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setPrompt(event.target.value);
  }




  const customStyles = `
  .ce-paragraph.cdx-block {
    max-width: 100%;
    width: 100%; /* Adjust to your desired width */
    // border: 1px solid black;
    // padding: 10px;
    // margin: 10px 0;
  }
`;

const customStyles2 = `
.ce-block__content {
  max-width:100%
}
.ce-toolbar__actions {
  padding-right: 420px;
}
`

  return (
    <Stack width={"100%"} minHeight={"100px"} spacing={2}>
      <Stack direction={"row"} justifyContent={"space-around"} spacing={2}>
      <TextField fullWidth size="small" onChange={handlePromptChange}/>
      <Button onClick={handleGenerateClick} size="small">Generate</Button>
      </Stack>
          
    <div id={holder} style={{ maxWidth: maxWidth ?? "100%",width:"100%", border:"1px solid black" }} >

    <style>{ customStyles}</style>
    <style>{ customStyles2}</style>

    </div>
    </Stack>

  )
  

};

export default memo(EditorBlock);
