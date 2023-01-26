const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const mongoose = require("mongoose");
require("./userSchema");
app.use(express.static("www"));
app.use(express.json());
app.use(cors());

const mongoUrl =
  "mongodb+srv://yyy71242:dd900102@cluster0.bymipdu.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));
const User = mongoose.model("UserInfo");

app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;
  try {
    if (data == "aaa") {
      res.status(200).send({ status: "OK" });
    } else {
      res.status(404).send({ status: "User Not Found" });
    }
  } catch (error) {
    res.status(400).send({ status: "Error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const oldUser = await User.findOne({ username });
  try {
    if (oldUser) {
      res.status(200).send({ status: "Exist" });
    } else {
      await User.create({
        username: username,
        password: password,
      });
      res.send({ status: "OK" });
    }
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.json({ status: "User not found" });
    } else if (password !== user.password) {
      return res.send({ status: "Password incorrect" });
    }
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});

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
