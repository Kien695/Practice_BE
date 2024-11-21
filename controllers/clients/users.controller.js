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
  const friendList = myUser.FriendList;
  const friendListId = friendList.map((item) => item.user_id);
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
      { _id: { $nin: friendListId } },
    ],
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};
//[get] users/request
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
//[get] users/accept
module.exports.accept = async (req, res) => {
  //socket
  userSocket(res);
  //end socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },

    status: "active",
    deleted: false,
  }).select("id avatar fullName");
  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời kết bạn",
    users: users,
  });
};
//[get] users/friends
module.exports.friends = async (req, res) => {
  //socket
  userSocket(res);
  //end socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const FriendList = myUser.FriendList;
  const FriendListId = FriendList.map((item) => item.user_id);

  const users = await User.find({
    _id: { $in: FriendListId },

    status: "active",
    deleted: false,
  }).select("id avatar fullName statusOnline");
  for (const user of users) {
    const infoFriend = FriendList.find((friend) => friend.user_id == user.id);
    user.infoFriend = infoFriend;
  }
  res.render("client/pages/users/friend", {
    pageTitle: "Danh sách bạn bè",
    users: users,
  });
};
