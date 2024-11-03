const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
//[get]admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  for (const item of records) {
    const updatedBy = item.updatedBy[item.updatedBy.length - 1];
    if (updatedBy) {
      const user = await Account.findOne({
        _id: updatedBy.account_id,
      });

      updatedBy.accountFullName = user.fullName;
    }
  }
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};
//[get]admin/role/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/create", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};
//[get]admin/role/createPost
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[get]admin/role/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      deleted: false,
      _id: id,
    };
    const data = await Role.findOne(find);
    res.render("admin/pages/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
//[patch]admin/role/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };

    await Role.updateOne(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      }
    );
    req.flash("success", "Cập nhật nhóm quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại!");
  }
  res.redirect("back");
};
//[get]admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records,
  });
};
//[patch]admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    req.flash("success", "Cập nhật phân quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền thất bại!");
  }

  res.redirect("back");
};
//[get]admin/role/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      deleted: false,
      _id: id,
    };
    const data = await Role.findOne(find);
    res.render("admin/pages/roles/detail", {
      pageTitle: "Chi tiết nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
//[delete]/admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Xóa nhóm quyền thành công!");
  res.redirect("back");
};
