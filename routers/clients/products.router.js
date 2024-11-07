const express = require("express");
const router = express.Router();
const productController = require("../../controllers/clients/product.controller");
router.get("/", productController.index);
router.get("/:slugCategory", productController.Category);
router.get("/detail/:slugProduct", productController.detail);
module.exports = router;
