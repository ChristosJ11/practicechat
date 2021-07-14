import React, {  useEffect, useState }  from 'react';
import axios from "axios"
const baseURL= process.env.BASEURLL||'http://localhost:3001'
const Roomslist=({uid,changeroom})=>{
    const[rooms,setrooms]=useState([{}])
    const[currentRoom,setcurrentRoom]=useState('')
    console.log(currentRoom)
    const changeRoom=(r)=>{
      setcurrentRoom(r);
      changeroom(r)
    }
 
    useEffect(() => {
      axios.get(baseURL+'/getRooms', {
        params:{
          userId:uid
        }
      })
      .then(function (response) {
       setrooms(response.data)
      })
      },[uid]);
    return(
        <div>
          
          {rooms?rooms.map(room=><button className='roomButton'key={room.roomId}  onClick={()=>{changeRoom(room.roomId)}}>{room.roomId}</button>):<p>bruh</p>}
          
        </div>
    )
}

export default Roomslist