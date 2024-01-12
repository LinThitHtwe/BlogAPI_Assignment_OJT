const {
  createBlog: createBlogService,
  updateBlog: updateBlogService,
  getBlogById: getBlogByIdService,
  getAllBlog: getAllBlogService,
  getTotalBlogsCount: getTotalBlogsCountService,
} = require("../services/blog.service");
const { created, updated, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const verifyRole = require("./verifyRole");
const role = require("../constants/role");

const getAllBlog = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const blogs = await getAllBlogService(page * 10, limit);
    const totalBlogs = await getTotalBlogsCountService();
    const nextPage = (page + 1) * 10 > totalBlogs ? null : page + 1;
    return retrieved(res, `Blogs ${responseMessages.retrievedSuccessfully}`, {
      ...blogs,
      totalBlogs,
      nextPage,
    });
  } catch (error) {
    next(error);
  }
};

const addBlog = async (req, res, next) => {
  try {
    const currentLoginUser = verifyRole(req.header("Authorization"));
    if (!currentLoginUser) {
      throw dbError.unauthorizedError(dbErrorMessages.unauthorized);
    }
    const requestData = req.body;
    const blog = await createBlogService({
      ...requestData,
      creator: currentLoginUser._id,
    });
    created(res, `Blog ${responseMessages.successfullyCreated}`, blog);
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.blogId);
    retrieved(res, `Blog ${responseMessages.retrievedSuccessfully}`, blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const currentLoginUser = verifyRole(req.header("Authorization"));
    const oldBlog = await getBlogByIdService(req.params.blogId);
    if (
      !currentLoginUser ||
      (currentLoginUser?.role === role.user &&
        currentLoginUser._id !== oldBlog.creator)
    ) {
      throw dbError.unauthorizedError(dbErrorMessages.unauthorized);
    }
    const requestData = req.body;
    const blog = await updateBlogService(req.params.blogId, {
      ...requestData,
      updater: currentLoginUser._id,
    });
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
  getBlogById,
  getAllBlog,
};
