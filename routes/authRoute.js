const express= require ('express')
const router= express.Router();
const User= require("../models/userAuthModel")
const session= require('express-session')
const MongoDBStore= require( 'connect-mongodb-session')(session)
const app=express()

const httpServer = require("http").createServer(app)
var mongodb= require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = " mongodb+srv://Foxtrot:Mongopassftw@cluster0.0zdrk.mongodb.net/Messager?retryWrites=true&w=majority";

//////////////////

//


//////////
const store = new MongoDBStore({
    uri:" mongodb+srv://Foxtrot:Mongopassftw@cluster0.0zdrk.mongodb.net/Messager?retryWrites=true&w=majority",
    collection: 'Messagercollection'
  });
app.use(session({
    name:'sid',
    resave:false,
    saveUninitialized:false,
    secret:'bruh',
    store: store,
    cookie:{
        maxAge:1000*60*60*2,
        sameSite:true,
        secure:false

    }
}))
  //
  


  //
router.route('/signUp').post((req,res)=>{
    const userId=req.body.userId
    const password=req.body.password
    const sId=''
    const newUser = new User({
        userId,
        password,
        sId,
    })
    newUser.save()
})
router.route('/signUpe').get((req,res)=>{
    User.findOne({ userId:req.query.userId}, function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
})

router.route('/signIne').get((req,res)=>{
    User.findOne({ userId:req.query.userId}, function(err, users){
   req.session.userid=req.query.userId
        if(err){
            console.log(err);
        }
        else {
            res.send(req.session);
        }
    });
})
//////

  ////
  

  
    //////////////
   

  ////////////////////////////

  router.route('/sock').post(async(req,res)=>{
    // create a filter for a movie to update
    const filter = { userId:req.body.userid };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
    
       sId:req.body.mysId
     
    };
    await User.findOneAndUpdate(filter, updateDoc)
  })

module.exports= router


