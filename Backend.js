const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const path = require("path");
app.use(cors());
app.use(express.json());
const MongoDBStore = require("connect-mongodb-session")(session);
const port = process.env.PORT || 3001;
require("dotenv").config();
const localMongo = "";

//mongo session
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || localMongo,
  collection: "Messagercollection",
});
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "bruh",
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: false,
    },
  })
);
//

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI || localMongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
//require route
app.use(require("./routes/messageRoute"));
app.use(require("./routes/authRoute"));
app.use(require("./routes/roomsRoute"));
app.use(express.static(path.join(__dirname, "true-app", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "true-app", "build", "index.html"));
});

const server = app.listen(port, function () {
  console.log("express server is running on port 3001");
});

const io = require("socket.io")(server, {
  cors: {
    origin: port,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header", "Access-Control-Allow-Origin"],
    credentials: false,
  },
});


io.on("connection", (socket) => {
  var prevRoom = "";
  socket.on("check", async (dat) => {
    socket.handshake.query.x = dat.uid;
    if (dat.uid == socket.handshake.query.x) {
      if (prevRoom != "") {
        await socket.leave(prevRoom);
      }
      socket.roomId = dat.room;
      prevRoom = dat.room;
      await socket.join(socket.roomId);
      console.log(dat.uid);
    } else {
      console.log("failed to join room");
    }
  });

  socket.on("send-message", async (data) => {
    console.log(
      socket.handshake.query.x +
        " is in " +
        socket.roomId +
        " saying " +
        data.message
    );
    await io.in(socket.roomId).emit("recieve-messageu", data);
  });
});
