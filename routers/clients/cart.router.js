const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/clients/cart.controller");
router.post("/add/:productId", cartController.addPost);
router.get("/", cartController.index);
router.get("/delete/:productId", cartController.delete);
router.get("/update/:productId/:quantity", cartController.update);
module.exports = router;