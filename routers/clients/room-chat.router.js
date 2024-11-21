const express = require("express");
const router = express.Router();
const roomChatController = require("../../controllers/clients/roomChat.controller");
router.get("/", roomChatController.index);
module.exports = router;
