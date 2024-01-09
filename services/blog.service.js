const Blog = require("../models/blog.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const { checkId } = require("./base.service");

const createBlog = async (categoryData) => {
  const blog = new Blog(categoryData);
  try {
    const result = await blog.save();
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const updateBlog = async (blogId, blogData) => {
  try {
    await checkId(blogId, Blog, dbErrorMessages.itemNotFound);
    const result = await Blog.findByIdAndUpdate(blogId, blogData, {
      new: true,
    });
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  createBlog,
  updateBlog,
};
