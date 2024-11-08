const homeRouter = require("./home.router.js");
const productsRouter = require("./products.router.js");
const searchRouter = require("./search.router.js");
const cartRouter = require("./cart.router.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
};
