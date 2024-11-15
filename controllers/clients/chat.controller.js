//[get] /checkout
module.exports.index = async (req, res) => {
  //socket.id
  _io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });
  //end socket.io
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};
