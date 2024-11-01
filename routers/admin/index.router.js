const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");
const productCategoryRouter = require("./product-category.router");
const recycleRouter = require("./recycle.router");
const roleRouter = require("./role.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
  const pathAdmin = systemConfig.prefixAdmin;
  app.use(
    pathAdmin + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRouter
  );
  app.use(pathAdmin + "/products", authMiddleware.requireAuth, productRouter);
  app.use(
    pathAdmin + "/products-category",
    authMiddleware.requireAuth,
    productCategoryRouter
  );
  app.use(
    pathAdmin + "/recycleBins",
    authMiddleware.requireAuth,
    recycleRouter
  );
  app.use(pathAdmin + "/roles", authMiddleware.requireAuth, roleRouter);
  app.use(pathAdmin + "/accounts", authMiddleware.requireAuth, accountRouter);
  app.use(pathAdmin + "/auth", authRouter);
};
