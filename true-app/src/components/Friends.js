import React, { Component, useEffect, useState }  from 'react';
import axios from "axios"

const baseURL= process.env.BASEURL||'http://localhost:3001'
const Friends=({changesid,uid})=>{
    const[mytext, typedText]= useState('')
    const[sId,setsId]=useState('')
    const onTurnin=(e)=>{
        e.preventDefault()
        axios.get('/getRoomsexist', {
        params:{
          userId:uid,
          to:mytext
        }
      })
      .then(function (response) {
        if(!mytext){
          alert("No Id entered")
          
      }
      else if(response.data[0]){
        alert('You already have a conversation with this user')
      }
      else{
        const roomPayload={
          roomId:uid+'&'+mytext,
          from:uid,
          to:mytext,
        }
        axios.post('/newRoom',roomPayload)
        /*
        axios.get('http://localhost:3001/newFriend', {
          params:{
            friend:mytext
          }
        }).then(function(response){
          
            console.log('this is the other id '+response.data.sId)
            setsId(response.data.sId)
            changesid(sId)
        })
        */
        
     typedText('')
      }
      })
       
       
          
          
    }
  return(
    <div className="Friends"  onSubmit={onTurnin}>
         <form>
        <input className='tt'type='text' placeholder={"Who do you want to talk to?"} value={mytext} 
        onChange={(e)=> typedText(e.target.value)}>
        </input>
        <input className='tb' type="submit"></input>
        </form>
        <div className='searchResults'></div>
    </div>
  )
}

export default Friends