const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");
const productCategoryRouter = require("./product-category.router");
const recycleRouter = require("./recycle.router");
const roleRouter = require("./role.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const pathAdmin = systemConfig.prefixAdmin;
  app.use(pathAdmin + "/dashboard", dashboardRouter);
  app.use(pathAdmin + "/products", productRouter);
  app.use(pathAdmin + "/products-category", productCategoryRouter);
  app.use(pathAdmin + "/recycleBins", recycleRouter);
  app.use(pathAdmin + "/roles", roleRouter);
  app.use(pathAdmin + "/accounts", accountRouter);
  app.use(pathAdmin + "/auth", authRouter);
};
