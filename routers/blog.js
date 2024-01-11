const { schemaValidator } = require("../middleware/schema.validator");
const {
  addBlog,
  updateBlog,
  getBlogById,
  getAllBlog,
} = require("../controller/blog.controller");
const blogRoute = require("../routes/blog");
const router = require("express").Router();

router.post(blogRoute.addBlog, schemaValidator("blog/"), addBlog);
router.post(blogRoute.updateBlog, schemaValidator("blog/"), updateBlog);
router.get(blogRoute.getBlogById, getBlogById);
router.get(blogRoute.allBlog, getAllBlog);

module.exports = router;
