const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
//[get] /checkout
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  //socket.id
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MASSAGE", async (data) => {
      let images = [];
      for (const image of data.images) {
        const link = await uploadToCloudinary(image);
        images.push(link);
      }

      //lưu vào database
      const chat = new Chat({
        user_id: userId,
        content: data.content,
        images: images,
      });
      await chat.save();
      //trả data về client
      _io.emit("SEVER_RETURN_MASSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
      });
    });
    //typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("SEVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    //end typing
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
