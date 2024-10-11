const Product = require("../../models/product.model");
//[get]admin/products
module.exports.index = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];
  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  let find = {
    deleted: false,
    //status: req.query.status,
  };
  if (req.query.status) {
    find.status = req.query.status; //thêm status vào find
  }
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }

  const Products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: Products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
