const Blog = require("../models/blog.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const {
  checkId,
  getObjectId,
  addConditionToCriteria,
  getPaginatedItems,
} = require("./base.service");
const Category = require("../models/category.model");

const createBlog = async (categoryData) => {
  const blog = new Blog(categoryData);
  try {
    const result = await blog.save();
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getAllBlog = async (
  skip,
  limit,
  sortBy,
  order,
  title,
  categoryName,
  status
) => {
  console.log("serviesafaefjalf");
  try {
    let criteria = {};

    criteria = addConditionToCriteria(
      criteria,
      "title",
      title ? { $regex: new RegExp(`.*${title}.*`, "i") } : null
    );

    criteria = addConditionToCriteria(
      criteria,
      "status",
      status ? status : null
    );

    const categories = await Category.find({ name: { $in: categoryName } });

    if (categories.length > 0) {
      criteria = addConditionToCriteria(criteria, "categories", {
        $in: categories.map((category) => category._id),
      });
    }

    const blogs = await getPaginatedItems(
      Blog,
      skip,
      limit,
      sortBy,
      order,
      [
        {
          path: "categories",
          select: "name",
        },
        {
          path: "creator",
          select: "username email description",
        },
      ],
      criteria
    );
    console.log("serviceee-----", blogs);
    return blogs;
  } catch (error) {
    console.log(error);
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getBlogById = async (blogId) => {
  try {
    await checkId(blogId, Blog, dbErrorMessages.itemNotFound);
    const existingBlog = await Blog.findById(blogId)
      .populate({
        path: "categories",
        select: "name",
      })
      .populate({
        path: "creator",
        select: "username email",
      })
      .exec();
    return existingBlog;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getTotalBlogsCount = async () => {
  try {
    const totalBlogsCount = await Blog.countDocuments();
    return totalBlogsCount;
  } catch (error) {
    console.log(error);
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const updateBlog = async (blogId, blogData) => {
  try {
    await checkId(blogId, Blog, dbErrorMessages.itemNotFound);
    const existingBlog = await Blog.findById(blogId)
      .populate("Category")
      .exec();
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
  getTotalBlogsCount,
  getBlogById,
};
