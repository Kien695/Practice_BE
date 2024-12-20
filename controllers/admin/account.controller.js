const Account = require("../../models/account.model");
const md5 = require("md5");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
//[get]admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const item of records) {
    const role = await Role.findOne({
      _id: item.role_id,
      deleted: false,
    });
    item.role = role;
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};
//[get]admin/account/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};
//[post]admin/account/create
module.exports.createPost = async (req, res) => {
  const emailExit = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExit) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
//[get]admin/account/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id,
  };
  try {
    const data = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
//[patch]admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExit = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExit) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
  }

  res.redirect("back");
};
//[get]admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };

  const detail = await Account.findOne(find).select("-password");
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/detail", {
    pageTitle: "Trang chi tiết",
    detail: detail,
    roles: roles,
  });
};
//[patch]admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  await Account.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Xóa tài khoản thành công!");
  res.redirect("back");
};
//[patch]admin/accounts/change-status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Account.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};
