const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
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
  //sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  //end sort
  //end pagination
  const Products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  for (const product of Products) {
    const user = await Account.findOne({
      _id: product.createdBy.account_id,
    });
    if (user) {
      product.accountFullName = user.fullName;
    }
  }
  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: Products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
//[get]admin/products/change-status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};
//[patch]admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Xóa ${ids.length} sản phẩm thành công!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Cập nhật vị trí ${ids.length} sản phẩm thành công!`
      );
      break;
    default:
      break;
  }
  res.redirect("back");
};
//[delete]/admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Xóa sản phẩm thành công!");
  res.redirect("back");
};
//[get]admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const category = await ProductCategory.find(find);
  const newCategory = createTreeHelper.tree(category);
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  });
};
//[post]admin/products/createPost
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position === "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
//[get]admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    const category = await ProductCategory.find({
      deleted: false,
    });
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
//[patch]admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  try {
    await Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    req.flash("success", "Cập nhật sản phẩm thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại!");
  }
  res.redirect(`back`);
};
//[get]admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
