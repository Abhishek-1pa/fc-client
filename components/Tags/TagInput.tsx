// TagInput.tsx
import { useState } from "react";

import { WithContext as ReactTags } from "react-tag-input";
import "./style.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const TagInput = ({ handleTagChange, selectedTags }: any) => {
  const [tags, setTags] = useState(selectedTags );

  const handleDelete = (i: number) => {
    const updatedTags = tags.filter((tag: any, index: number) => index !== i);
    setTags(updatedTags);
    handleTagChange(updatedTags); // Pass updatedTags to handleTagChange
  };

  const handleAddition = (tag: { id: string; text: string; }) => {
    
    const updatedTags = [...tags, tag];
    setTags(updatedTags);
    handleTagChange(updatedTags); // Pass updatedTags to handleTagChange
  };

  const handleDrag = (
    tag: { id: string; text: string },
    currPos: number,
    newPos: number
  ) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
    handleTagChange(newTags); // Pass newTags to handleTagChange
  };

  const handleTagClick = (index: any) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div>
      <h3>Enter tags</h3>
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        autocomplete
        maxLength={20}
        maxTags = {5}
      />
    </div>
  );
};

export default TagInput;