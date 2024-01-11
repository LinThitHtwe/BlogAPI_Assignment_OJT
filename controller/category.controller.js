const {
  createCategory: createCategoryService,
  getCategoryById: getCategoryByIdService,
  getAllCategories: getAllCategoriesService,
  updateCategory: updateCategoryService,
} = require("../services/category.service");
const { created, retrieved, updated } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbErrors = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const role = require("../constants/role");
const verifyRole = require("./verifyRole");

const addCategory = async (req, res, next) => {
  try {
    const currentLoginUser = verifyRole(req);
    if (!currentLoginUser || currentLoginUser?.role !== role.admin) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }
    const requestData = req.body;
    const result = await createCategoryService({
      ...requestData,
      creator: currentLoginUser._id,
    });
    return created(
      res,
      `Category ${responseMessages.successfullyCreated}`,
      result
    );
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService();
    retrieved(
      res,
      `Categories ${responseMessages.retrievedSuccessfully}`,
      categories
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

const updateCategory = async (req, res, next) => {
  try {
    const currentLoginUser = verifyRole(req);
    if (!currentLoginUser || currentLoginUser?.role !== role.admin) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }
    const { name: requestCategoryName } = req.body;
    const existingCategory = await getCategoryByIdService(
      req.params.categoryId
    );
    if (
      existingCategory.name.trim().toLowerCase() ===
      requestCategoryName.trim().toLowerCase()
    ) {
      throw dbErrors.itemAlreadyExists(dbErrorMessages.itemAlreadyExists);
    }

    const updatedCategory = await updateCategoryService(
      req.params.categoryId,
      req.body
    );
    updated(
      res,
      `Category ${responseMessages.retrievedSuccessfully}`,
      updatedCategory
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoryById,
  addCategory,
  getAllCategories,
  updateCategory,
};
