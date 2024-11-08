const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    //tạo giỏ hàng
    const cart = new Cart();
    await cart.save();
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + 432000000),
    });
  } else {
    //lấy ra thôi
  }
  next();
};
