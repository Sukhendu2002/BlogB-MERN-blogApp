import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextEditor = ({ value, onChange }) => {
  const editor = useRef(null);
  const contentChange = (content) => {
    onChange(content);
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={contentChange}
    />
  );
};

export default RichTextEditor;
