const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const Controller = require("../../controllers/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", Controller.index);
router.get("/edit", Controller.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  Controller.editPatch
);

module.exports = router;
