const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const Controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", Controller.index);
router.get("/create", Controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  Controller.createPost
);
router.get("/edit/:id", Controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  Controller.editPatch
);
router.get("/detail/:id", Controller.detail);
router.patch("/delete/:id", Controller.deleteItem);
module.exports = router;
