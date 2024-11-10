const express = require("express");
const router = express.Router();
const userController = require("../../controllers/clients/user.controller");
const validate = require("../../validates/client/user.validate");
router.get("/register", userController.register);
router.post("/register", validate.registerPost, userController.registerPost);
module.exports = router;
