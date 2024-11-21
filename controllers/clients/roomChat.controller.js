const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");
//[get] /rooms-chat
module.exports.index = async (req, res) => {
  res.render("client/pages/room-chat/index", {
    pageTitle: "Danh sách phòng",
  });
};
//[get] /rooms-chat/create
module.exports.create = async (req, res) => {
  const friendList = res.locals.user.FriendList;
  for (const friend of friendList) {
    const infoFriend = await User.findOne({
      _id: friend.user_id,
      deleted: false,
    }).select("fullName avatar");
    friend.infoFriend = infoFriend;
  }
  res.render("client/pages/room-chat/create", {
    pageTitle: "Tạo phòng",
    friendList: friendList,
  });
};
//[post] /rooms-chat/createPost
module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const usersId = req.body.userId;
  const dataRoom = {
    title: title,

    typeRoom: "group",

    users: [],
  };
  for (const userId of usersId) {
    dataRoom.users.push({
      user_id: userId,
      role: "user",
    });
  }
  dataRoom.users.push({
    user_id: res.locals.user.id,
    role: "superAdmin",
  });
  const roomChat = new RoomChat(dataRoom);
  await roomChat.save();

  res.redirect(`/chat/${roomChat.id}`);
};
