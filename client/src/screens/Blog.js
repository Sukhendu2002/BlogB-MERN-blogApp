import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const Blog = () => {
  //get the id from the url
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

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

  useEffect(() => {
    try {
      axios
        .get(`/api/blog/${id}`)
        .then((res) => {
          setBlog(res.data.blog);
          setLoading(false);
          setComments(res.data.blog.comments.reverse());
          console.log(res.data.blog.comments);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleComment = (e) => {
    e.preventDefault();

    //if there is no authToken, redirect to login
    if (!localStorage.getItem("authToken")) {
      notify("Please login to comment", "error");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      axios
        .post(`/api/blog/addcomment/${id}`, { comment }, config)
        .then((res) => {
          setComments(res.data.comments.reverse());
          setComment("");
          notify(res.data.message, "success");
        })
        .catch((err) => {
          notify(err.response.data.message, "error");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      notify(err.response.data.message, "error");
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-3">
          <h1>{blog.title}</h1>
          {/* <span>{blog.createdByName}</span>
          <span>{blog.createdAt}</span> */}
          <h6>
            <BiUserCircle /> {blog.createdByName}
          </h6>
          <h6>
            <MdDateRange />{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h6>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "70%",
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          />
          {/* <p
            style={{
              width: "70%",
            }}
          >
            {blog.body}
          </p> */}
          {/* //parse the html from blog.body */}
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />

          <div className="mt-3 mb-5">
            <h3>Comments</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <textarea
                placeholder="Add a comment"
                style={{
                  // width: "70%",
                  height: "100px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="btn btn-primary m-2" onClick={handleComment}>
                Submit
              </button>

              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <BiUserCircle />
                    {""}
                    <h6
                      style={{
                        marginLeft: "5px",
                        alignSelf: "center",
                      }}
                    >
                      {comment.name + " : " + comment.comment}
                    </h6>
                  </div>
                ))
              ) : (
                <div>No comments</div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Blog;
