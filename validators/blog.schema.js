const Joi = require("joi");

const blog = Joi.object({
  title: Joi.string().required().max(255),
  content: Joi.string().required(),
  url_list: Joi.array().items(Joi.string()),
  status: Joi.string().valid("pending", "rejected", "approved"),
});

module.exports = blog;
