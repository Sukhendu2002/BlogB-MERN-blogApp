const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    minlength: [3, "Title must be at least 3 characters"],
  },
  body: {
    type: String,
    required: [true, "Please enter a body"],
    minlength: [3, "Body must be at least 3 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: [true, "Please enter an image"],
    minlength: [3, "Image must be at least 3 characters"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
