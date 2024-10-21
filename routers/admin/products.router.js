const express = require("express");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const ProductsController = require("../../controllers/admin/product.controller");
router.get("/", ProductsController.index);
router.patch("/change-status/:status/:id", ProductsController.changeStatus);
router.patch("/change-multi", ProductsController.changeMulti);
router.patch("/delete/:id", ProductsController.deleteItem);
router.get("/create", ProductsController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  ProductsController.createPost
);
module.exports = router;
