import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "bold",
    "italic",
    "link",
    "unlink",
    "underline",
    "source",
    "|",
    "image",
    "video",
    "table",
    "|",
    "indent",
    "outdent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "line",
    "|",
    "align",
    "|",
    "list",
    "|",
    "undo",
    "redo",
    "|",
    "fullsize",
    "|",
    "selectall",
    "|",
    "preview",
    "|",
    "print",
    "|",
    "help",
    "loremipsum",
  ],
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
