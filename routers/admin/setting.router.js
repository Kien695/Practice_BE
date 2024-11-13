const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const settingController = require("../../controllers/admin/setting-general.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/general", settingController.general);
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,

  settingController.generalPatch
);
module.exports = router;
