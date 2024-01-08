const { addUser: addUserService } = require("../services/user.service");
const { created, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");

const getUserDetails = (req, res) => {
  res.json("Hello I'm a user");
};

module.exports = {
  getUserDetails,
};
