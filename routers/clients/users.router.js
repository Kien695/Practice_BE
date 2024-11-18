const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/clients/users.controller");
router.get("/not-friend", usersController.notFriend);
module.exports = router;
