const Router = require("express").Router;
const router = Router();
const { protect } = require("../middleware/auth");

const {
  getBlogs,
  createBlog,
  deleteBlog,
  getUserBlogs,
  getBlog,
} = require("../controllers/blogCtrl");

router.route("/blogs").get(getBlogs);

router.route("/postblog").post(protect, createBlog);

router.route("/deleteblog/:id").delete(protect, deleteBlog);

router.route("/userblogs").get(protect, getUserBlogs);

router.route("/:id").get(getBlog);

module.exports = router;
