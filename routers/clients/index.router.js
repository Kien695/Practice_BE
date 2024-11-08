const homeRouter = require("./home.router.js");
const productsRouter = require("./products.router.js");
const searchRouter = require("./search.router.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
  app.use("/search", searchRouter);
};
