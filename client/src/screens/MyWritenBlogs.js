import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const MyWritenBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      axios
        .get("/api/blog/userblogs", config)
        .then((res) => {
          setBlogs(res.data.blogs);
          console.log(res.data.blogs);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-3">
      <h2 className="title">My Blogs</h2>
      <div className="row">
        {blogs.map((blog) => {
          return <Card key={blog._id} 
            title={blog.title}
            des={blog.body}
            imgs={blog.image}
          />;
        })}
      </div>
    </div>
  );
};

export default MyWritenBlogs;
