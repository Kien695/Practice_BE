const User = require("../../models/user.model");
module.exports = (res) => {
  _io.once("connection", (socket) => {
    //chức năng gởi yêu cầu
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //thêm Id của A vào acceptFriends của B
      const exitIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (!exitIdAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }
      //thêm id của B vào requestFriends của A
      const exitIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (!exitIdBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userId },
          }
        );
      }
      //lấy ra độ dài acceptFriends của B và trả về cho B
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SEVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });
    });
    //chức năng hủy gởi yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //xóa Id của A vào acceptFriends của B
      const exitIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (exitIdAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { acceptFriends: myUserId },
          }
        );
      }
      //xóa id của B vào requestFriends của A
      const exitIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (exitIdBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { requestFriends: userId },
          }
        );
      }
      //lấy ra độ dài acceptFriends của B và trả về cho B
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SEVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });
    });
    //chức năng từ chối kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //xóa Id của A vào acceptFriends của B
      const exitIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      if (exitIdAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { acceptFriends: userId },
          }
        );
      }
      //xóa id của B vào requestFriends của A
      const exitIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (exitIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    //chức năng chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //thêm {user_id;room_chat_id} của A vào friendList của B
      //xóa Id của A vào acceptFriends của B
      const exitIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      if (exitIdAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              FriendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },

            $pull: { acceptFriends: userId },
          }
        );
      }
      //thêm {user_id;room_chat_id} của B vào friendList của A
      //xóa id của B vào requestFriends của A
      const exitIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (exitIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              FriendList: {
                user_id: myUserId,
                room_chat_id: "",
              },
            },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
  });
};
