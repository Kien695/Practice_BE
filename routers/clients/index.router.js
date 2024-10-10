const homeRouter = require("./home.router.js");
const productsRouter = require("./products.router.js");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
};
