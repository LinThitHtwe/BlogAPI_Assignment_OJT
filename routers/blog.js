const { schemaValidator } = require("../middleware/schema.validator");
const {
  addBlog,
  updateBlog,
  getBlogById,
  getAllBlog,
  getBlogByUser,
  getBlogsStatusCount,
} = require("../controller/blog.controller");
const blogRoute = require("../routes/blog");
const router = require("express").Router();

router.post(blogRoute.addBlog, schemaValidator("blog/"), addBlog);
router.put(blogRoute.updateBlog, updateBlog);
router.get(blogRoute.getBlogById, getBlogById);
router.get(blogRoute.allBlog, getAllBlog);
router.get(blogRoute.getBlogByUser, getBlogByUser);
router.get(blogRoute.dashboard, getBlogsStatusCount);

module.exports = router;
