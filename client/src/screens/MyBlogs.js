import React, { useState } from "react";
import axios from "axios";

const MyBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      axios
        .post("/api/blog/postblog", { title, body, image }, config)
        .then((res) => {
          setTitle("");
          setBody("");
          setImage("");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="title">Write A Post</h2>
      <form
        onSubmit={handleSubmit}
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
          <textarea
            className="form-control"
            id="body"
            rows="3"
            placeholder="Enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

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

export default MyBlogs;
