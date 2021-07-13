const mongoose=require('mongoose');

const roomsSchema={
    roomId:String,
    from:String,
    to:String,

}

const Rooms= mongoose.model("Rooms", roomsSchema)

module.exports =Rooms;