const express = require("express");
const app = require("express")();
const httpServer = require("http").createServer(app);
const router = express.Router();
const Message = require("../models/messageModel");
const port = process.env.PORT || 3001;

router.route("/create").post(async (req, res) => {
  const title = req.body.title;
  const userId = req.body.userId;
  const roomId = req.body.roomId;
  console.log("backend message sent from" + roomId);
  const newMessage = new Message({
    title,
    userId,
    roomId,
  });
  await newMessage.save();
});

router.route("/create").get(async (req, res) => {
  await Message.find({ roomId: req.query.roomId }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});


module.exports = router;

/*
io.sockets.on('connection', (socket) => {
  socket.on('createRoom', function(data) {
      let room = new Room(data).create();

      let id = room.data.uuid
      socket.join(id, (err) => {
         if (err) {
             // do something here if the join fails
             console.log(err);
             return;
         }
         
         // call this only after the join has completed
         io.to(id).emit('roomcreated', {data: data, msg: 'Room Created'});
      });
  });
});

*/
