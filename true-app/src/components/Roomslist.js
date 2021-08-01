import React, {  useEffect, useState }  from 'react';
import axios from "axios"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';



const Roomslist=({uid,changeroom})=>{
  
    const[rooms,setrooms]=useState([{}])
    const[currentRoom,setcurrentRoom]=useState('')
    const changeRoom=(r)=>{
      setcurrentRoom(r);
      changeroom(r)
    }
    const deleteRoom=(r)=>{
        axios.delete('/deleteRooms',{
          params:{
            roomId:r
          }
        })
        setrooms(rooms.filter(room=>room.roomId!=r))
    }
    useEffect(() => {
      axios.get('/getRooms', {
        params:{
          userId:uid
        }
      })
      .then(function (response) {
        
       setrooms(response.data)
      })
      },[uid]);
    return(
        <div className='Roomslist'>
          <div className='roomflow'>
          {rooms?rooms.map(room=><div className='wrapper'><button className='roomButton'key={room.roomId}  onClick={()=>{changeRoom(room.roomId)}}>
            <div className='horizButton'>
            
          
  <div className='verticButton'>
            <div className='themessage'>{room.to==uid?room.from:room.to}</div>
            <div className='fromwho'>{room.lastMessage}</div>
            </div>
           
            </div>
            </button><IconButton onClick={()=>{deleteRoom(room.roomId)}}className='trashRoom'aria-label="delete">
  <DeleteForeverIcon className='trashRoom'/>
</IconButton></div>):<p>Add a friend to talk to or refresh the page if you cannot see the messages</p>}
            </div>
            
        </div>
    )
}

export default Roomslist