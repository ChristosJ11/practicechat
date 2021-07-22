import React, { Component, useRef }  from 'react';
import {useState} from 'react'
import axios from "axios"
import Sform from './Sform'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const baseURL= process.env.BASEURL||'http://localhost:3001'
const Suform =()=>{
    const[user, typedUser]=useState('')
    const[pass,typedPass]=useState('')
    const signText=useRef(null)
    const onTurnin=(e)=>{
      e.preventDefault()
      if(!user || !pass){
          alert("no Username or Password entered")
          return
      }
      var sendUser={
        userId:user,
        password:pass,
      }
      
      
//
axios.get('/signUpe', {
  params:{
    userId:user,
    password:pass
  }
})
.then(function (response) {
  console.log(response)
  if(response.data==''){
   axios.post('/signUpe', sendUser)
   signText.current.className='issigneduptrue'
  }
  else{
    alert('this user already exists')
  }
})

     typedUser('')
     typedPass('')
  }
    return(
     <div className="Sform" onSubmit={onTurnin}>
      
      
       <form>
           <input className='tt' placeholder="Username" value={user}  onChange={(e)=> typedUser(e.target.value)}>
           </input>
           <input className='tt'placeholder="Password" value={pass}  onChange={(e)=> typedPass(e.target.value)}>
           </input>
           <input className='tb' type='submit' value='Sign Up'></input>
       </form>
       <div ref={signText} className='issignedup'>You are signed up, sign in below</div>
     </div>
     
    )
}

export default Suform