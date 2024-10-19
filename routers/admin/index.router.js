const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");
const recycleRouter = require("./recycle.router");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const pathAdmin = systemConfig.prefixAdmin;
  app.use(pathAdmin + "/dashboard", dashboardRouter);
  app.use(pathAdmin + "/products", productRouter);
  app.use(pathAdmin + "/recycleBins", recycleRouter);
};
