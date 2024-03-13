//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import { TextField } from "@mui/material";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  maxWidth?:string;
};

const EditorBlock = ({ data, onChange, holder, maxWidth }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
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


  const customStyles = `
  .ce-paragraph.cdx-block {
    max-width: 100%;
    width: 100%; /* Adjust to your desired width */
    border: 1px solid black;
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

  return <div id={holder} style={{ maxWidth: maxWidth ?? "100%",width:"100%", border:"1px solid black" }} >

    <style>{ customStyles}</style>
    <style>{ customStyles2}</style>
  </div>; // Apply maxWidth style
};

export default memo(EditorBlock);
