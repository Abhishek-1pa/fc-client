// TagInput.tsx
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagInput = ({ handleTagChange, selectedTags }: any) => {
  const [tags, setTags] = useState(selectedTags || []);

  const handleTagInputOnChange = (newTags: string[]) => {
    setTags(newTags);
    handleTagChange(newTags);
  };

  const customStyles = `
    .rti--container {
      --rti-bg: #fff !important;
      --rti-border: #ccc !important;
      --rti-main: #00000 !important;
      --rti-radius: 0.375rem !important;
      --rti-s: 0.5rem !important; /* spacing */
      --rti-tag: #edf2f7 !important;
      --rti-tag-remove: #e53e3e !important;
    }
  `;


  return (
    
    <div>
       <style>{customStyles}</style> 
      <TagsInput
        value={tags}
        onChange={handleTagInputOnChange}
        name="tags"
        placeHolder="tags"
        
      />
      <em>Enter tags</em>
    </div>
  );
};

export default TagInput;
