import React, { Component }  from 'react';
import {useState} from 'react'
import axios from "axios"
import Sform from './Sform'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const Suform =()=>{
    const[user, typedUser]=useState('')
    const[pass,typedPass]=useState('')
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
axios.get('http://localhost:3001/signUp', {
  params:{
    userId:user
  }
})
.then(function (response) {
  if(response.data==null){
   axios.post('http://localhost:3001/signUp', sendUser)
  }
  else{
    alert('this user already exists')
  }
})

//
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
           <input className='tb' type='submit' value='login'></input>
       </form>
     </div>

    )
}

export default Suform