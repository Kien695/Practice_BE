const homeRouter = require("./home.js");
const productsRouter = require("./products.js");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
};
