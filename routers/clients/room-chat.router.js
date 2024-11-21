const express = require("express");
const router = express.Router();
const roomChatController = require("../../controllers/clients/roomChat.controller");
router.get("/", roomChatController.index);
router.get("/create", roomChatController.create);
router.post("/create", roomChatController.createPost);
module.exports = router;
