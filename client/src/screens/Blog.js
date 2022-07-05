import React, { useState, useEffect } from "react";
import axios from "axios";


const Blog = () => {
  //get the id from the url
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios
        .get(`/api/blog/${id}`)
        .then((res) => {
          setBlog(res.data.blog);
          setLoading(false);
          console.log(res.data);
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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container mt-3">
          <h1>{blog.title}</h1>
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
        </div>
      )}
    </div>
  );
};

export default Blog;
