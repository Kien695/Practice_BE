const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
//[get]/admin/recycle
module.exports.index = async (req, res) => {
  //lọc
  const filterStatus = filterStatusHelpers(req.query);
  let find = {
    deleted: true,
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
  //pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  //end pagination
  const Products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/recycle/index", {
    pageTitle: "Trang thùng rác",
    products: Products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
//[patch]admin/recycle/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "restore-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: false, deletedAt: new Date() }
      );
      req.flash("success", `Khôi phục ${ids.length} sản phẩm thành công!`);
    default:
      break;
  }
  res.redirect("back");
};
//[restore]/admin/recycle/restore/:id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    {
      deleted: false,
      restoreAt: new Date(),
    }
  );
  req.flash("success", "Khôi phục phẩm thành công!");
  res.redirect("back");
};
