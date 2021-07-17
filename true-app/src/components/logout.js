import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import {useState} from 'react'
import axios from "axios"
const Logout=({deleteUID})=>{
 const history=useHistory() 
 
 
 
 const deleteStorage=()=>{
    
   localStorage.removeItem('uid')
   deleteUID()
   if(localStorage.getItem('uid')==null){
    history.push('/signIn')
   }else{
     console.log('whats up')
   }
  
 }

    return(
 <div>
<button className='tb'onClick={(e)=>deleteStorage(e.target.value)}>
    Logout
</button>
      
 </div>

    )
}

export default Logout