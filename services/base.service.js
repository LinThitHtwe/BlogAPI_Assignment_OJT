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

exports.getObjectId = async (id) => {
  await this.checkValidObjectId(id);
  if (id) {
    return new mongoose.Types.ObjectId(id);
  }
};

exports.addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
};

exports.getPaginatedItems = async (
  Model,
  skip = 1,
  limit = 6,
  sortBy = "createdAt",
  order = "-1",
  populate,
  criteria
) => {
  let query = {};
  if (criteria) {
    query = {
      $and: [criteria],
    };
  }

  const items = {
    content: await Model.find(query)
      .sort({ [sortBy]: parseInt(order) })
      .skip((parseInt(skip) - 1) * parseInt(limit))
      .limit(limit)
      .populate(populate),
    totalCount: await Model.countDocuments(query),
  };
  return items;
};
