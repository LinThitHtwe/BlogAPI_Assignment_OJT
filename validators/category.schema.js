const Joi = require("joi");

const category = Joi.object({
  name: Joi.string().required(),
  created_by: Joi.string().required(),
});

module.exports = category;
