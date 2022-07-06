import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MyBlogCard from "../components/MyBlogCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import server from "../config/index";

const MyWritenBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      axios
        .get(`${server}/api/blog/userblogs`, config)
        .then((res) => {
          setBlogs(res.data.blogs.reverse());
          setLoading(false);
          console.log(res.data.blogs);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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

  const handelDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      await axios
        .delete(`${server}/api/blog/deleteblog/${id}`, config)
        .then((res) => {
          notify(res.data.message, "success");
          setBlogs(blogs.filter((blog) => blog._id !== id));
        })
        .catch((err) => {
          notify(err.response.data.message, "error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div class="container mt-3">
          <div class="row">
            {blogs.map((blog) => {
              return (
                <MyBlogCard
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  imgs={blog.image}
                  des={blog.body}
                  handleDelete={handelDelete}
                />
              );
            })}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default MyWritenBlogs;
