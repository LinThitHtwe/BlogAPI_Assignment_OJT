const {
  getUserById: getUserByIdService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
} = require("../services/user.service");
const { retrieved, updated, deleted } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbErrors = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const verifyRole = require("./verifyRole");
const role = require("../constants/role");

const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.userId);
    if (!user) {
      throw dbErrors.itemNotFound(dbErrorMessages.itemNotFound);
    }
    retrieved(res, `User ${responseMessages.retrievedSuccessfully}`, user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const oldUser = await getUserByIdService(req.params.userId);
    if (!oldUser) {
      throw dbErrors.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    const currentLoginUser = verifyRole(req.header("Authorization"));
    if (
      currentLoginUser &&
      currentLoginUser.role === role.user &&
      oldUser._id != currentLoginUser._id
    ) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }

    const user = await updateUserService(req.params.userId, req.body);
    updated(res, `User ${responseMessages.updatedSuccessfully}`, user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  console.log("delete user");
  try {
    const oldUser = await getUserByIdService(req.params.userId);
    if (!oldUser) {
      throw dbErrors.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    const currentLoginUser = verifyRole(req.header("Authorization"));
    if (
      currentLoginUser?.role === role.user &&
      req.params.userId != currentLoginUser._id
    ) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }
    await deleteUserService(req.params.userId);

    deleted(res, `User ${responseMessages.deletedSuccessfully}`, {
      message: `User ${responseMessages.deletedSuccessfully}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
