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
////////////////////////////////////////////
// ES6 import or TypeScript
import { io } from "socket.io-client";

const socket = io('http://localhost:3001',{
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
 const[uid, setuid]=useState('')
const[all,setall]=useState([{}])
const[sid,setsid]=useState('')
const[m,setm]=useState({})




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
     
      setall(all.concat(m))
      
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
  setall([{}])
}

 //CUBE
 const cube=useRef(null)



//room assigner
const changeR=(r)=>{
  changeRoom(r)
  const rpayload={
    room:r,
    uid:uid,
  }
  socket.emit('check',rpayload)
cube.current.className='cube-turn'
}
const roomback=()=>{
  cube.current.className='cube'
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
//sign in function

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
    
      <Router>
      <Route path='/'>
          <Link to="/signIn">Sign In</Link>
          </Route>
        <Switch>
          
          <Route path="/signIn">
          <Subutton onClick={onClick}/>
      {show?<Suform />:<p></p>}
         
       <Sbutton onClick={onClick}/>
      {show?<Sform changr={uidchangr}/>:<p></p>}
      </Route>
      <Route path="/creator">
          
          
          <div className="scene">
  <div ref={cube}className="cube">
    <div className="cube-face  cube-face-front"> <Friends changesid={blah} uid={uid}/>
    <Roomslist uid={uid} changeroom={changeR}/></div>
    <div className="cube-face  cube-face-back"></div>
    <div className="cube-face  cube-face-left"></div>
    <div className="cube-face  cube-face-right"> <Textshow texts={texts} uid={uid}  all={all} room={room} removeAll={resetAll}/>
          <button className='tb' onClick={()=>{roomback()}}>Back</button>
          <Texttype addText={sendText} uid={uid} rid={room}/></div>
    <div className="cube-face  cube-face-top"></div>
    <div className="cube-face  cube-face-bottom"></div>
  </div>
</div>
          </Route>
        </Switch>
        
    </Router>
   
    </div>
  )
}

export default App;
