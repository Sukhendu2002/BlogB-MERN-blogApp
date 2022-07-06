import React, { useState, useEffect } from "react";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import server from "../config/index";

const EditBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  //get the id from the url
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(`${server}/api/blog/${id}`)
      .then((res) => {
        setTitle(res.data.blog.title);
        setBody(res.data.blog.body);
        setImage(res.data.blog.image);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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

  const handleUpdate = (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      axios
        .put(`${server}/api/blog/updateblog/${id}`, { title, body, image }, config)
        .then((res) => {
          console.log(res);
          notify(res.data.message, "success");
          //wait for the toast to disappear
          setLoading(false);
          setTimeout(() => {
            navigate("/myblogs");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          notify(err.response.data.message, "error");
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-3">
          <h2 className="title">Write A Post</h2>
          <form
            onSubmit={handleUpdate}
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
                Update
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default EditBlog;
