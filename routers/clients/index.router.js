const homeRouter = require("./home.router.js");
const productsRouter = require("./products.router.js");
const searchRouter = require("./search.router.js");
const cartRouter = require("./cart.router.js");
const checkoutRouter = require("./checkout.router.js");
const userRouter = require("./user.router.js");
const chatRouter = require("./chat.router.js");
const usersRouter = require("./users.router.js");

const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const userMiddleware = require("../../middlewares/client/user.middleware.js");
const settingMiddleware = require("../../middlewares/client/setting.middleware.js");
const authMiddleware = require("../../middlewares/client/auth.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.use(settingMiddleware.settingGeneral);
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/user", userRouter);
  app.use("/chat", authMiddleware.requireAuth, chatRouter);
  app.use("/users", authMiddleware.requireAuth, usersRouter);
};
