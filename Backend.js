const mongoose= require('mongoose')
const express=require('express')
const cors= require("cors");
const app=express();
const session= require('express-session')
app.use(cors());
app.use(express.json());
const MongoDBStore= require( 'connect-mongodb-session')(session)

/////////////////////

  
/////////////////////
//mongo session
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

//connect to mongoose
mongoose.connect("mongodb+srv://Foxtrot:Mongopassftw@cluster0.0zdrk.mongodb.net/Messager?retryWrites=true&w=majority",
 { useUnifiedTopology: true, 
useNewUrlParser: true,
useFindAndModify:false });
//require route


//

//

app.use( require("./routes/messageRoute"))
app.use( require("./routes/authRoute"))
app.use( require("./routes/roomsRoute"))

//

//




//crud stuff

/*
app.get('/home',redirectLogin, (req,res) =>{
 
})
app.get('/login',redirectHome, (req,res) =>{
    
})

app.post('/login',redirectHome, (req,res) =>{
    
})
app.post('/logout',redirectLogin, (req,res) =>{
    
})
app.post('/register',redirectHome, (req,res) =>{
    
})

//
*/

app.listen(3001, function(){
    console.log("express server is running on port 3001")
})

