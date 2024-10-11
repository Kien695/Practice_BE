const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
//[get]admin/products
module.exports.index = async (req, res) => {
  //lọc
  const filterStatus = filterStatusHelpers(req.query);
  let find = {
    deleted: false,
    //status: req.query.status,
  };
  if (req.query.status) {
    find.status = req.query.status; //thêm status vào find
  }
  //tìm kiếm
  const objectSearch = searchHelpers(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  const Products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: Products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
