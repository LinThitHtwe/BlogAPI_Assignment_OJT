const Joi = require("joi");

const user = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").required(),
  description: Joi.string().max(255),
});

module.exports = user;
