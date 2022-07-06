import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const notify = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    //if any of the fields are empty, notify the user
    if (title === "" || body === "" || image === "") {
      notify("Please fill in all the fields", "error");
    }

    try {
      axios
        .post("/api/blog/postblog", { title, body, image }, config)
        .then((res) => {
          setTitle("");
          setBody("");
          setImage("");
          notify("Your blog has been posted successfully", "success");
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
            className="form-control mb-2"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="image">Thumbnail Image Link</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyBlogs;
