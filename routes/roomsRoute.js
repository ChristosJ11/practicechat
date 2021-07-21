const { response } = require('express');
const express= require ('express')
const app = require("express")();
const httpServer = require("http").createServer(app)
const router= express.Router();
const Room= require("../models/roomsModel")

router.route('/newRoom').post((req,res)=>{
    const roomId=req.body.roomId;
    const from=req.body.from;
    const to=req.body.to;
    const people=req.body.people;
    const newRoom = new Room({
        roomId,
        from,
        to,
        people,
    })
    newRoom.save()
    Room.createIndex({people:1})
})

router.route('/getRooms').get(async(req,res)=>{
    const user=req.query.userId
    await Room.find({people:user },function(err,rooms){
        if(err){
            console.log(err)
        }
        else{
           res.json(rooms)
        }
    })
})

router.route('/getRoomsexist').get(async(req,res)=>{
    const user=req.query.userId
    const to=req.query.to
    await Room.find({ $or: [ { roomId:user +'&'+ to }, { roomId :to +'&'+ user } ] },function(err,rooms){
        if(err){
            console.log(err)
        }
        else{
           res.json(rooms)
        }
    })
})
router.route('/lastMessage').post(async(req,res)=>{
    const filter = { roomId:req.body.room };
    const updateDoc = {
       lastMessage:req.body.lastMessage,
    };
    await Room.findOneAndUpdate(filter, updateDoc)
  })

  
module.exports=router