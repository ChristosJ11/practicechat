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

const Sform =({changr})=>{
    const[user, typedUser]=useState('')
    const[pass,typedPass]=useState('')
    const history=useHistory()
    const onTurnin=(e)=>{
      e.preventDefault()
      if(!user || !pass){
          alert("no Username or Password entered")
          return
      }
     
      
      
//
axios.get('http://localhost:3001/signUp', {
  params:{
    userId:user
  }
})
.then(function (response) {
  if(response.data==null){
    alert('this user does not exist')
   
  }
  else if(response.data.password!=pass){
    alert('The username or password is incorrect')
  }
  else{
    axios.get('http://localhost:3001/signIn', {
      params:{
        userId:user
      }
    }).then(function(response){
   
      changr(response.data.userid)
      localStorage.setItem('uid', response.data.userid);
      
    })
    
    history.push('/create')
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
           <input className='tt' placeholder="Password" value={pass}  onChange={(e)=> typedPass(e.target.value)}>
           </input>
           <input className='tb' type='submit' value='login'></input>
       </form>
       
     </div>

    )
}

export default Sform