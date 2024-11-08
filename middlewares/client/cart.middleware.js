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
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    res.locals.miniCart = cart;
  }
  next();
};
