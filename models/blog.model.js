const mongoose = require("mongoose");
const { postStatus } = require("../constants/status");
const base = require("./base.schema");

const blogSchema = new base.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  url_list: {
    type: [String],
  },
  status: {
    type: String,
    default: postStatus.pending,
    enum: [postStatus.pending, postStatus.approved, postStatus.rejected],
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
