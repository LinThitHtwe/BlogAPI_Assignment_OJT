const Joi = require("joi");

exports.category = Joi.object({
  name: Joi.string().required(),
  created_by: Joi.string().required(),
});
