const {
  addUser: addUserService,
  getUserById: getUserByIdService,
} = require("../services/user.service");
const { created, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbErrors = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

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

const updateUser = () => {};

module.exports = {
  getUserById,
};
