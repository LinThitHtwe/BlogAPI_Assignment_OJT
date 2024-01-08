const { category } = require("./category.schema");
const { user } = require("./user.schema");

module.exports = {
  "category/add": category,
  "auth/register": user,
};
