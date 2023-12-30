const mongoose = require("mongoose");
const { postStatus } = require("@/constants/status");

const blogSchema = mongoose.Schema(
  {
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
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    modified_at: {
      type: Date,
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
