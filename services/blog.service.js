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

const getAllBlog = async (skip, limit = 10) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
    return blogs;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getBlogById = async (blogId) => {
  try {
    await checkId(blogId, Blog, dbErrorMessages.itemNotFound);
    const existingBlog = await Blog.findById(blogId);
    return existingBlog;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const updateBlog = async (blogId, blogData) => {
  try {
    await checkId(blogId, Blog, dbErrorMessages.itemNotFound);
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      throw new Error(dbErrorMessages.itemNotFound);
    }
    const result = await Blog.findByIdAndUpdate(blogId, blogData, {
      new: true,
    });
    return result;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getAllBlog,
  getBlogById,
};
