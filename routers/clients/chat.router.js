const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/clients/chat.controller");
const chatMiddleware = require("../../middlewares/client/chat.middleware");
router.get("/:roomChatId", chatMiddleware.isAccess, chatController.index);

module.exports = router;
