import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import axios from "axios";

export const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a Header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  paragraph: Paragraph,
  checklist: CheckList,
  embed: Embed,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const formData = new FormData();
          formData.append("filename", file);

          // Return the Promise directly
          return axios
            .post("http://localhost:8002/blogs/uploadFile", formData, {
              headers,
            })
            .then((response) => {
              console.log(response);
              return {
                success: 1,
                file: {
                  url: `http://localhost:8002/blogs/image/${response.data.img_id}`,
                },
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                success: 0,
              };
            });
        },
      },
    },
  },
  inlineCode: InlineCode,
  link: Link,
  list: List,
  quote: Quote,
  simpleImage: SimpleImage,
  delimiter: Delimiter,
};
