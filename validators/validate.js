const category = require("./category.schema");
const user = require("./user.schema");
const blog = require("./blog.schema");

module.exports = {
  "category/add": category,
  "auth/register": user,
  "blog/": blog,
};
