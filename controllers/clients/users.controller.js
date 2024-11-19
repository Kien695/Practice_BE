const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/users.socket");
//[get] users/not-friends
module.exports.notFriend = async (req, res) => {
  //socket
  userSocket(res);
  //end socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};
//[get] users/not-friends
module.exports.request = async (req, res) => {
  //socket
  userSocket(res);
  //end socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },

    status: "active",
    deleted: false,
  }).select("id avatar fullName");
  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gởi",
    users: users,
  });
};
