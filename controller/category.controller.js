const {
  createCategory: createCategoryService,
  getCategoryById: getCategoryByIdService,
} = require("../services/category.service");
const { created, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");

const addCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    return created(
      res,
      `Category ${responseMessages.successfullyCreated}`,
      result
    );
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const result = await getCategoryByIdService(req.params.categoryId);
    return retrieved(
      res,
      `Category ${responseMessages.retrievedSuccessfully}`,
      result
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategoryById, addCategory };
