const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/clients/search.controller");
router.get("/", searchController.index);
module.exports = router;
