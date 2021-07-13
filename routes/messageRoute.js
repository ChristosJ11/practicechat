const express= require ('express')
const app = require("express")();
const httpServer = require("http").createServer(app)
const router= express.Router();
const Message= require("../models/messageModel")


  
const io = require("socket.io")(httpServer, {
  cors: {

    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header",'Access-Control-Allow-Origin'],
    credentials: false
  }
})
  
  
  

    
    //const newMessage = new Message({
    //    title,
    //   
    //})//
    //newMessage.save()
  

////////////////////////////
/*
const connect= new Promise((resolve, reject)=>{MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },function(err, db) {
  if (err) throw err;
  var dbo = db.db("Messager");
  dbo.collection("messages").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
})});
connect.then(value => { return value + ' and bar'; }).catch(value => { return value + ' and bar'; })

*/
////////////////
router.route('/create').post((req,res)=>{
    const title=req.body.title
    const userId=req.body.userId
    const roomId=req.body.roomId
    console.log('backend message sent from'+roomId)
    const newMessage = new Message({
        title,
        userId,
        roomId,
    })
    newMessage.save()
})





  router.route('/create').get(async(req,res)=>{ 
    
   await Message.find({roomId:req.query.roomId }, function(err, users){
   
        if(err){
            console.log(err);
        }
        else {
          
            res.json(users);
           
        
        }
    });
  })
  
  
    
  

  
  io.on("connection", ( socket) => {
    var prevRoom=''
    console.log('hand'+socket.handshake.query.x)
    socket.on('check',(dat)=>{
     if(dat.uid==socket.handshake.query.x){
       socket.leave(prevRoom)
       socket.roomId=dat.room
       prevRoom=dat.room
       socket.join(socket.roomId)
     }else{
       console.log('loser')
     }
    
    })
      
      
      socket.on("send-message", (data) => {
        console.log(socket.handshake.query.x+' is in '+socket.roomId+' saying '+data.message)
        io.in(socket.roomId).emit('recieve-messageu', data);
      // io.emit('recieve-messageu',data)
      });
    
    
   
})
  
  //

module.exports= router

httpServer.listen(3002);
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