const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const accountController = require("../../controllers/admin/account.controller");
const validate = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", accountController.index);
router.get("/create", accountController.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  accountController.createPost
);
router.get("/edit/:id", accountController.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch,
  accountController.editPatch
);
router.get("/detail/:id", accountController.detail);
router.patch("/delete/:id", accountController.delete);
router.patch("/change-status/:status/:id", accountController.changeStatus);
module.exports = router;
