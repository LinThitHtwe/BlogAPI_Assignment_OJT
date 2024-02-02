const {
  createBlog: createBlogService,
  updateBlog: updateBlogService,
  getBlogById: getBlogByIdService,
  getAllBlog: getAllBlogService,
  getTotalBlogsCountByUser: getTotalBlogsCountByUserService,
  getBlogByUserId: getBlogByUserIdService,
  getAllBlogStatusCount: getAllBlogStatusCountService,
} = require("../services/blog.service");
const { created, updated, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const verifyRole = require("./verifyRole");
const role = require("../constants/role");

const getAllBlog = async (req, res, next) => {
  try {
    const { skip, limit, sortBy, order, title, categoryName, status } =
      req.query;

    const blogs = await getAllBlogService(
      skip,
      limit,
      sortBy,
      order,
      title,
      categoryName,
      status
    );
    return retrieved(
      res,
      `Blogs ${responseMessages.retrievedSuccessfully}`,
      blogs
    );
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const fileName = req.file.filename;
    const filePath = req.file.path;

    return res.status(200).json({
      message: "File uploaded successfully",
      fileName: fileName,
      filePath: filePath,
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

const getBlogsStatusCount = async (req, res, next) => {
  try {
    const blogStatusCount = await getAllBlogStatusCountService();
    retrieved(
      res,
      `Blog Status Coiunt ${responseMessages.retrievedSuccessfully}`,
      blogStatusCount
    );
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
      (currentLoginUser?.role == role.user &&
        currentLoginUser._id != oldBlog.creator._id)
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

const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getBlogByUser = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const blogsByUser = await getBlogByUserIdService(
      req.params.userId,
      (page - 1) * limit,
      limit
    );
    const totalBlogsCount = await getTotalBlogsCountByUserService(
      req.params.userId
    );
    retrieved(res, `Blog ${responseMessages.retrievedSuccessfully}`, {
      blogs: blogsByUser,
      totalBlogsCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBlog,
  updateBlog,
  getBlogById,
  getAllBlog,
  getBlogByUser,
  getBlogsStatusCount,
  uploadImage,
};
