const settingModel = require("../../models/setting-general.model");
//[get]admin/setting/general
module.exports.general = async (req, res) => {
  const settingGeneral = await settingModel.findOne({});
  res.render("admin/pages/settings/general", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};
//[patch]admin/setting/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await settingModel.findOne({});
  if (settingGeneral) {
    await settingModel.updateOne(
      {
        _id: settingGeneral.id,
      },
      req.body
    );
  } else {
    const getting = new settingModel(req.body);
    await getting.save();
  }

  res.redirect("back");
};
