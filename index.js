const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
const app = express();
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const Router = require("./routers/clients/index.router.js");
const RouterAdmin = require("./routers/admin/index.router.js");

const database = require("./config/database.js");
const systemConfig = require("./config/system.js");
database.connect();
const port = process.env.PORT;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
//flash
app.use(cookieParser("KIENNE"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
//socket.io

const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//end socket.io
//tinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
//end tinyMCE
app.use(express.static(`${__dirname}/public`)); //nhúng file tĩnh
Router(app);
RouterAdmin(app);
app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
server.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});
