const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
//[get]admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: newRecords,
  });
};
//[get]admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    records: newRecords,
  });
};
//[post]admin/products-category/createPost
module.exports.createPost = async (req, res) => {
  if (req.body.position === "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
//[get]admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await ProductCategory.findOne({
      _id: id,
      deleted: false,
    });
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
//[patch]admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne(
    {
      _id: id,
    },
    req.body
  );
  res.redirect("back");
};
//[patch]admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id,
  };
  const category = await ProductCategory.findOne(find);
  res.render("admin/pages/products-category/detail", {
    pageTitle: "Chi tiết danh mục sản phẩm",
    category: category,
  });
};
//[delete]/admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Xóa sản phẩm thành công!");
  res.redirect("back");
};
