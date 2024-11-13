const mongoose = require("mongoose");
const SettingSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    // facebook:String,
    // zalo:String,
    // ...
  },
  {
    timestamps: true,
  }
);
const Setting = mongoose.model("Setting", SettingSchema, "settings-general");
module.exports = Setting;
