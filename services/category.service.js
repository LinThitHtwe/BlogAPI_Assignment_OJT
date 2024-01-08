const Category = require("../models/category.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const { checkId } = require("./base.service");

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  try {
    const result = await category.save();
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    await checkId(categoryId, Category, dbErrorMessages.itemNotFound);
    const result = await Category.findById(categoryId);
    return result;
  } catch (error) {
    throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
  }
};

module.exports = {
  createCategory,
  getCategoryById,
};
