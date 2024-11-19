const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,

    status: {
      type: String,
      default: "active",
    },
    requestFriends: Array,
    acceptFriends: Array,
    FriendList: [
      {
        user_id: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    restoreAt: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
