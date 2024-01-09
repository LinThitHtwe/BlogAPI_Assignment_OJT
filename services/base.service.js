const mongoose = require("mongoose");
const { invalidIdError, itemNotFoundError } = require("../errors/db.error");

exports.checkId = async (id, Model, key) => {
  await this.checkValidObjectId(id, key);
  const document = await Model.findById(id);
  if (!document) throw itemNotFoundError(key);
};

exports.checkValidObjectId = async (id, key) => {
  if (!mongoose.isValidObjectId(id)) {
    throw invalidIdError(key);
  }
};
