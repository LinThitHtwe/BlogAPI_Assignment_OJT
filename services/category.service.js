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
    if (error.code === 11000) {
      throw dbError.alreadyExistsError(dbErrorMessages.alreadyExistsError);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    await checkId(categoryId, Category, dbErrorMessages.itemNotFound);
    const result = await Category.findById(categoryId);
    return result;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    await checkId(categoryId, Category, dbErrorMessages.itemNotFound);
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      throw new Error(dbErrorMessages.itemNotFound);
    }
    const result = await Category.findByIdAndUpdate(categoryId, categoryData, {
      new: true,
    });
    return result;
  } catch (error) {
    if (error.code === 11000) {
      throw dbError.alreadyExistsError(dbErrorMessages.alreadyExistsError);
    }
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
};
