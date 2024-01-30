const Joi = require("joi");

const blog = Joi.object({
  title: Joi.string().required().max(255),
  subTitle: Joi.string().required().max(255),
  content: Joi.string().required(),
  // url_list: Joi.array().items(Joi.string()),
  url_list: Joi.array(),
  status: Joi.string().valid("pending", "rejected", "approved"),
  categories: Joi.array().items(Joi.string()),
});

module.exports = blog;
