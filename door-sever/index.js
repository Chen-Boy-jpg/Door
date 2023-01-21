const express = require("express");
const app = express();
app.use(express.static("www"));
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3001, () => {
  console.log("Server started on port 3000");
});

io.on("connection", (socket) => {
  console.log(`User connected:${socket.id}`);

  socket.on("open", (data) => {
    io.emit("DoorOpen", "open");
    console.log(data);
  });
  socket.on("close", (data) => {
    io.emit("DoorClose", "close");
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
