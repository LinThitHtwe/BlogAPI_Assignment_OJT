const mongoose = require("mongoose");
const role = require("../constants/role");
const { userStatus } = require("../constants/status");
const base = require("./base.schema");
const userSchema = new base.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: role.user,
    enum: [role.admin, role.user],
  },
  status: {
    type: String,
    required: true,
    default: userStatus.suspended,
    enum: [userStatus.active, userStatus.suspended],
  },
  description: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
