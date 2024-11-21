const RoomChat = require("../../models/room-chat.model");
module.exports.isAccess = async (req, res, next) => {
  const roomChatId = req.params.roomChatId;
  const userId = res.locals.user.id;
  const exitUserInRoomChat = await RoomChat.findOne({
    _id: roomChatId,
    "users.user_id": userId,
    deleted: false,
  });
  if (exitUserInRoomChat) {
    next();
  } else {
    res.redirect("/");
  }
};
