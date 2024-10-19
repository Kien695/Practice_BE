const express = require("express");
const router = express.Router();
const ProductsController = require("../../controllers/admin/product.controller");
router.get("/", ProductsController.index);
router.patch("/change-status/:status/:id", ProductsController.changeStatus);
router.patch("/change-multi", ProductsController.changeMulti);
router.patch("/delete/:id", ProductsController.deleteItem);
module.exports = router;
