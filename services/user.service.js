const User = require("../models/user.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const {
  checkId,
  getPaginatedItems,
  addConditionToCriteria,
} = require("./base.service");

const addUser = async (userData) => {
  const user = new User(userData);
  try {
    const result = await user.save();
    return result;
  } catch (error) {
    if (error.code === 11000) {
      throw dbError.alreadyExistsError(dbErrorMessages.alreadyExistsError);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const updateUser = async (userId, userData) => {
  try {
    await checkId(userId, User, dbErrorMessages.itemNotFound);
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error(dbErrorMessages.itemNotFound);
    }
    const result = await User.findByIdAndUpdate(userId, userData, {
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

const getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ email });
    return result ? result : null;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getUserByUsername = async (username) => {
  try {
    const result = await User.findOne({ username });
    return result ? result : null;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getUserById = async (userId) => {
  try {
    await checkId(userId, User, dbErrorMessages.itemNotFound);
    const result = await User.findById(userId).select(
      "username email description"
    );
    return result;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const deleteUser = async (userId) => {
  try {
    await checkId(userId, User, dbErrorMessages.itemNotFound);
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error(dbErrorMessages.itemNotFound);
    }
    const result = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );
    console.log("result--", result);
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getAllUser = async (skip, limit, sortBy, order, username, status) => {
  try {
    let criteria = {};
    criteria = addConditionToCriteria(
      criteria,
      "username",
      username ? { $regex: new RegExp(`.*${username}.*`, "i") } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "status",
      status ? status : null
    );
    const users = await getPaginatedItems(
      User,
      skip,
      limit,
      sortBy,
      order,
      "",
      criteria
    );
    return users;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  addUser,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getUserByUsername,
  getAllUser,
};
