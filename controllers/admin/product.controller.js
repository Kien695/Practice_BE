const Product = require("../../models/product.model");
//[get]admin/products
module.exports.index = async (req, res) => {
  const Products = await Product.find({
    deleted: "false",
  });
  console.log(Products);
  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: Products,
  });
};
