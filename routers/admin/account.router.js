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
module.exports = router;
