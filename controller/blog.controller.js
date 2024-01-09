const {
  createBlog: createBlogService,
  updateBlog: updateBlogService,
} = require("../services/blog.service");
const { created, updated } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

const addBlog = async (req, res, next) => {
  try {
    const blog = await createBlogService(req.body);
    created(res, `Blog ${responseMessages.successfullyCreated}`, blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await updateBlogService(req.params.blogId, req.body);
    if (!blog) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    updated(res, `Blog ${responseMessages.updatedSuccessfully}`, blog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBlog,
  updateBlog,
};
