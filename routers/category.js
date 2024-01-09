const {
  addCategory,
  getCategoryById,
  getAllCategories,
} = require("../controller/category.controller");
const categoryRoute = require("../routes/category");
const router = require("express").Router();
const { schemaValidator } = require("../middleware/schema.validator");

router.get(categoryRoute.getById, getCategoryById);
router.post(categoryRoute.add, schemaValidator("category/add"), addCategory);
router.get(categoryRoute.all, getAllCategories);

module.exports = router;
