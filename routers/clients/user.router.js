const express = require("express");
const router = express.Router();
const userController = require("../../controllers/clients/user.controller");
const validate = require("../../validates/client/user.validate");
router.get("/register", userController.register);
router.post("/register", validate.registerPost, userController.registerPost);
router.get("/login", userController.login);
router.post("/login", validate.loginPost, userController.loginPost);
module.exports = router;
