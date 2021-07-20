import React, { Component, useEffect, useState, useRef }  from 'react';
import axios from "axios"



const baseURL= process.env.BASEURL||'http://localhost:3001'
const Textshow = ({ uid,all,room,removeAll})=> {
    
    const[b, setb]=useState([{}])
    const textpapa=useRef(null)
      useEffect(async() => {
         
        await axios.get('/create',{
          params:{
            roomId:room,
          }
        })
        .then(function (response) {
          setb(response.data)
          removeAll()
            textpapa.current.scrollTop=(textpapa.current.offsetHeight*textpapa.current.clientHeight)
        })
      },[room])
      
      useEffect(()=>{
       
        textpapa.current.scrollTop=(textpapa.current.offsetHeight*textpapa.current.clientHeight)
        
      },[all])
     
    return (
        <div className="Textshow">
        
         <p>Welcome {uid}!</p>
         
     <div className='textpapa' ref={textpapa}>
       <div> {b.map(home => <div key={home._id}className={home.userId==uid?'textboxu':'textbox'}><div className='themessage' >{home.title}</div>
          <div className='fromwho' >{home.userId}</div></div>)}</div>
 
{console.log(all)}
      <div>{ all.map(h=><div key={h.id} className={h.userId==uid?'textboxu':'textbox' }><div className='themessage' >{h.message}</div>
          <div className='fromwho' >{h.userId}</div></div>) }</div>
        
        </div>
        </div>
    )
}

export default Textshow
