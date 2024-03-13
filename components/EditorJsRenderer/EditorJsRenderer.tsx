import { OutputData } from "@editorjs/editorjs";
import React from "react"
import editorjsHtml from "editorjs-html";
import { Stack } from "@mui/material";
const EditorJsToHtml = editorjsHtml();

type Props = {
    data:OutputData;
}

type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({data}:Props)=>{
    const html = EditorJsToHtml.parse(data) as ParsedContent[];

    return (

     <div key={data.time}>
            {html.map((item, index)=>{
                if(typeof item == "string"){
                    return(
                        <div dangerouslySetInnerHTML={{__html:item}} key = {index}>
                            </div>
                    )
                }
                return item;
            })}
        </div>
   
    )
}

export default EditorJsRenderer;