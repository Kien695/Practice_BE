const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/clients/cart.controller");
router.post("/add/:productId", cartController.addPost);
module.exports = router;
