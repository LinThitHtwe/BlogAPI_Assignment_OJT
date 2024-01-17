const {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../controller/category.controller");
const categoryRoute = require("../routes/category");
const router = require("express").Router();
const { schemaValidator } = require("../middleware/schema.validator");
const authenticateToken = require("../middleware/verifyJwt");

router.get(categoryRoute.getById, getCategoryById);
router.post(
  categoryRoute.add,
  authenticateToken,
  schemaValidator("category/add"),
  addCategory
);
router.get(categoryRoute.all, getAllCategories);
router.put(
  categoryRoute.update,
  authenticateToken,
  schemaValidator("category/add"),
  updateCategory
);

module.exports = router;
