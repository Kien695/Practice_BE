const express = require("express");
const app = express();

const Router = require("./routers/clients/index.js");

require("dotenv").config();

const database = require("./config/database.js");

database.connect();
const port = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public")); //nhúng file tĩnh
Router(app);
app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});
