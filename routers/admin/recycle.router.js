const express = require("express");
const router = express.Router();
const recycleController = require("../../controllers/admin/recycle.controller");
router.get("/", recycleController.index);
router.patch("/restore/:id", recycleController.restoreItem);
router.patch("/change-multi", recycleController.changeMulti);
module.exports = router;
