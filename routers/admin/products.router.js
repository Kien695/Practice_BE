const express = require("express");
const router = express.Router();
const ProductsController = require("../../controllers/admin/product.controller");
router.get("/", ProductsController.index);
module.exports = router;
