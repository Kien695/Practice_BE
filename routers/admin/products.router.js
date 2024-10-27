const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const ProductsController = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", ProductsController.index);
router.patch("/change-status/:status/:id", ProductsController.changeStatus);
router.patch("/change-multi", ProductsController.changeMulti);
router.patch("/delete/:id", ProductsController.deleteItem);
router.get("/create", ProductsController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  ProductsController.createPost
);
router.get("/edit/:id", ProductsController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  ProductsController.editPatch
);
router.get("/detail/:id", ProductsController.detail);
module.exports = router;
