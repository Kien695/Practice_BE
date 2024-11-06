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
  const newProductsFeatured = productsHelper.priceNewProducts(productFeatured);
  //hiển thị danh sách sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: "false",
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);
  const newProductsNew = productsHelper.priceNewProducts(productsNew);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
