const mongoose= require('mongoose');

const notesSchema={
    title:String,
    userId:String,
    roomId:String,
}
const Message= mongoose.model("Message", notesSchema)

module.exports =Message;