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
const authenticateToken = require("../middleware/verifyJwt");

router.post(
  blogRoute.addBlog,
  authenticateToken,
  schemaValidator("blog/"),
  addBlog
);
router.put(blogRoute.updateBlog, authenticateToken, updateBlog);
router.get(blogRoute.getBlogById, getBlogById);
router.get(blogRoute.allBlog, getAllBlog);
router.get(blogRoute.getBlogByUser, getBlogByUser);
router.get(blogRoute.dashboard, getBlogsStatusCount);

module.exports = router;
