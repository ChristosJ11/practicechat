const mongoose= require('mongoose');

const userSchema={
    userId:String,
    password:String,
    sId:String,
   
}
const User= mongoose.model("User", userSchema)

module.exports =User;