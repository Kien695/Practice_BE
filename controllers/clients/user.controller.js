const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
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
//[get] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};
//[post] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản không hoạt động");
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
//[get] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
//[get] /user/password/forgotPassword
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgotPassword", {
    pageTitle: "Lấy lại mật khẩu",
  });
};
//[post] /user/password/forgotPasswordPost
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }
  //lưu thông tin vào db
  const otp = generateHelper.generateRandomNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  //Nếu tồn tại email thì gởi mã otp qua email
  const subject = "Mã OTP xác minh";
  const html = `Mã OTP lấy lại mật khẩu là: <b style="color: green;">${otp}</b>. Thời hạn sử dụng là 6 phút.`;
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};
//[get] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã otp",
    email: email,
  });
};
//[post] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!result) {
    req.flash("error", "Mã otp không hợp lệ");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};
//[get] /user/password/reset
module.exports.reset = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};
//[post] /user/password/resetPost
module.exports.resetPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );
  req.flash("success", "Đổi mật khẩu thành công");
  res.redirect("/");
};
