import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  MemoryRouter,
  useHistory,
  useLocation,
  Redirect
} from "react-router-dom";
import Texttype from './components/Texttype'
import Textshow from './components/Textshow'
import Sbutton from './components/Sbutton'
import Sform from './components/Sform'
import Subutton from './components/Subutton'
import Suform from './components/Suform'
import Friends from './components/Friends'
import Roomslist from './components/Roomslist'
import Logout from './components/logout'
////////////////////////////////////////////
// ES6 import or TypeScript
import { io } from "socket.io-client";

const socket = io({
  withCredentials: false,
  transports:['websocket'],
  extraHeaders: {
    "my-custom-header": "abcd"
  },
  query: {
    x: localStorage.getItem('uid')
  }
 
});
socket.on("connection", () => {
    
  console.log('this is the local'+socket.id);
  
});


/////////////////////////////////////////////////
const App=() =>{
const[room,changeRoom]=useState('')
const[texts, changeTexts]= useState("")
 const[show, setShow]=useState(false)
 const[showup,setShowup]=useState(false)
 const[uid, setuid]=useState('')
const[all,setall]=useState([])
const[sid,setsid]=useState('')
const[m,setm]=useState({})



const dash=useRef(null)
const panel=useRef(null)
const blah=(s)=>{
  setsid(s)
}
  /////////////////////////
  const thing=useCallback(()=>{
    socket.on('recieve-messageu', message=>{
      setm(message)
      console.log('recieved')
     })
     return m
  },[m])
  useEffect(()=>{
    if(thing()){  
     if(m.userId){
      setall(all.concat(m))
      
     }
      
      
    }
    
  },[thing])

   console.log('main body')
  ///////
  const checkAuth= ()=>{
 if(uid){
   return true
 }
   
 }
 const PrivateRoute=({ component:Component, ...rest })=> (
  <Route{...rest} render={props=>(
    checkAuth()?(
      <Component{...props}/>
      ): (
      <Redirect to={{pathname:'/signUp'}}/>
      )
  )}/>
) 
 ///////////
  
//reset ALL
const resetAll=()=>{
  setall([])
}

 //CUBE
 



//room assigner
const changeR=(r)=>{
  changeRoom(r)
  const rpayload={
    room:r,
    uid:uid,
  }
  socket.emit('check',rpayload)
  dash.current.className='newdash'
  panel.current.className='newpanel'
}
const roomback=()=>{
  dash.current.className='dashboard'
  panel.current.className='messagePanel'
}


 //message function
 const sendText= (trutext)=>{
   changeTexts(trutext)
   const mpayload={
     userId:uid,
     message:trutext,
     
    
   }
   socket.emit('send-message', mpayload)
   
 }

 //sign in button
const onClick= ()=>{
  setShow(!show)
  
}
const onClicker=()=>{
  setShowup(!showup)
}
//sign out function
const deleteUID=()=>{
  setuid('')
}
//
//update uid
const uidchangr=(ing)=>{
  setuid(ing)
}


useEffect(() => {
  setuid(window.localStorage.getItem('uid'));
}, []);

useEffect(() => {
  window.localStorage.setItem('uid', uid);
}, [uid]);





  return (
   
    <div className="App">
       <div className='defaultspacer'></div>
    <div className='logo'>BANTAM</div>
    <div className='subLogo'>A lightweight messaging solution</div>
      <Router>{uid==''?<Route path='/'>
          <Link to="/signIn" ><div className='tb'>Sign In/ Sign Up</div></Link>
          </Route>:<div></div>}
      
        <Switch>
          
          <Route path="/signIn">
          <Subutton onClick={onClick}/>
      {show?<Suform />:<p></p>}
         
       <Sbutton onClick={onClicker}/>
      {showup?<Sform changr={uidchangr}/>:<p></p>}
      </Route>
      <Route path="/creator">
          <div className='create'>
              <div className='dashboard' ref={dash}>
               
                 <Logout deleteUID={deleteUID}/>
                 <Friends changesid={blah} uid={uid}/>
                 <Roomslist uid={uid} changeroom={changeR}/>
              </div>
              <div className='messagePanel' ref={panel}>
                <div className='defaultspacer'></div>
              <button className='tb' onClick={()=>{roomback()}}><h1>Back</h1></button>
                  <Textshow  uid={uid}  all={all} room={room} removeAll={resetAll} />
                  <Texttype addText={sendText} uid={uid} rid={room}/>
                
              </div>
          </div>
          </Route>
        </Switch>
        
    </Router>
   
    </div>
  )
}

export default App;
