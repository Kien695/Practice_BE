const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const Router = require("./routers/clients/index.router.js");
const RouterAdmin = require("./routers/admin/index.router.js");
require("dotenv").config();

const database = require("./config/database.js");
const systenConfig = require("./config/system.js");
database.connect();
const port = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public")); //nhúng file tĩnh
Router(app);
RouterAdmin(app);
app.locals.prefixAdmin = systenConfig.prefixAdmin;
app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});
