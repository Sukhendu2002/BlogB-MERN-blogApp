import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import server from "../config/index";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${server}/api/blog/blogs`)
      .then((res) => {
        setBlogs(res.data.blogs.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                id={blog._id}
                author={blog.createdByName}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
