const Joi = require("joi");

const category = Joi.object({
  name: Joi.string().required(),
});

module.exports = category;
