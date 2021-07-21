import React, {  useEffect, useState }  from 'react';
import axios from "axios"
const baseURL= process.env.BASEURL||'http://localhost:3001'
const Roomslist=({uid,changeroom})=>{
    const[rooms,setrooms]=useState([{}])
    const[currentRoom,setcurrentRoom]=useState('')
    const changeRoom=(r)=>{
      setcurrentRoom(r);
      changeroom(r)
    }
 
    useEffect(() => {
      axios.get('/getRooms', {
        params:{
          userId:uid
        }
      })
      .then(function (response) {
        console.log(response.data)
       setrooms(response.data)
      })
      },[uid]);
    return(
        <div className='roomflow'>
          
          {rooms?rooms.map(room=><button className='roomButton'key={room.roomId}  onClick={()=>{changeRoom(room.roomId)}}>
            <div className='themessage'>{room.to==uid?room.from:room.to}</div>
            <div className='fromwho'>{room.lastMessage}</div>
            </button>):<p>Add a friend to talk to or refresh the page if you cannot see the messages</p>}
          
        </div>
    )
}

export default Roomslist