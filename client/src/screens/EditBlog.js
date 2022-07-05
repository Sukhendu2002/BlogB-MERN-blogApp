import React, { useState, useEffect } from "react";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  //get the id from the url
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(`/api/blog/${id}`)
      .then((res) => {
        setTitle(res.data.blog.title);
        setBody(res.data.blog.body);
        setImage(res.data.blog.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="title">Write A Post</h2>
      <form
        // onSubmit={handleSubmit}
        style={{
          display: "block",
        }}
      >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="body">Body</label>
          {/* <textarea
            className="form-control"
            id="body"
            rows="3"
            placeholder="Enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea> */}
          <RichTextEditor value={body} onChange={(c) => setBody(c)} />

          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
