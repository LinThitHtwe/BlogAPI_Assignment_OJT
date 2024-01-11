const mongoose = require("mongoose");
const base = require("./base.schema");
const categorySchema = new base.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
