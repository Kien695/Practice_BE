const express = require("express");
const router = express.Router();
const checkoutController = require("../../controllers/clients/checkout.controller");
router.get("/", checkoutController.index);
router.post("/orders", checkoutController.order);
router.get("/success/:ordersId", checkoutController.success);
module.exports = router;
