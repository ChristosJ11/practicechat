const mongoose=require('mongoose');

const roomsSchema={
    roomId:String,
    from:String,
    to:String,
    lastMessage:String,
    people:Array,

}

const Rooms= mongoose.model("Rooms", roomsSchema)

module.exports =Rooms;