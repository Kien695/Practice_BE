const User = require("../../models/user.model");
const md5 = require("md5");
//[get] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};
//[ost] /user/register
module.exports.registerPost = async (req, res) => {
  const exitEmail = await User.findOne({
    email: req.body.email,
  });

  if (exitEmail) {
    req.flash("error", "Email này đã tồn tại");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
