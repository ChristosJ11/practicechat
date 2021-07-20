const mongoose=require('mongoose');

const roomsSchema={
    roomId:String,
    from:String,
    to:String,
    lastMessage:String,

}

const Rooms= mongoose.model("Rooms", roomsSchema)

module.exports =Rooms;