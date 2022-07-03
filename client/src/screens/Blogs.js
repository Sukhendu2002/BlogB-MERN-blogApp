import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/blog/blogs")
      .then((res) => {
        setBlogs(res.data.blogs.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            title={blog.title}
            imgs={blog.image}
            des={blog.body}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
