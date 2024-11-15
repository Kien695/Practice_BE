const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//[get] /checkout
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  //socket.id
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MASSAGE", async (content) => {
      //lưu vào database
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
    });
  });
  //lấy data ra giao diện
  const chats = await Chat.find({
    deleted: false,
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = infoUser;
  }

  //end socket.io
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};