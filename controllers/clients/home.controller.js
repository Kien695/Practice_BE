const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
//[get] /
module.exports.index = async (req, res) => {
  //lấy ra sản phẩm nổi bật
  const productFeatured = await Product.find({
    featured: "1",
    deleted: "false",
    status: "active",
  }).limit(6);
  const newProducts = productsHelper.priceNewProducts(productFeatured);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: newProducts,
  });
};
