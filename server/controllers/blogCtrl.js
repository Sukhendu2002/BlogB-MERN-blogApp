const Blog = require("../models/blogModel");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createBlog = async (req, res, next) => {
  const { title, body, image } = req.body;
  const blog = new Blog({
    title,
    body,
    image,
    createdBy: req.user._id,
    createdByName: req.user.userName,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json({
      newBlog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res, next) => {
  const { title, body, image } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }
  blog.title = title;
  blog.body = body;
  blog.image = image;
  try {
    const updatedBlog = await blog.save();
    res.status(200).json({
      updatedBlog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }
  try {
    await blog.remove();
    res.status(200).json({
      message: "Blog removed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get all the blogs created by a particular user
exports.getUserBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id });
    res.status(200).json({
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get a particular blog by id
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      blog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
