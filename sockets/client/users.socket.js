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
    });
  });
};
