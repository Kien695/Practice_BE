const settingModel = require("../../models/setting-general.model");
module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await settingModel.findOne({});
  res.locals.settingGeneral = settingGeneral;
  next();
};
