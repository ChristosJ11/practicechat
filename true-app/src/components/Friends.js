import React, { Component, useEffect, useRef, useState }  from 'react';
import axios from "axios"


const baseURL= process.env.BASEURL||'http://localhost:3001'
const Friends=({changesid,uid})=>{
    const[mytext, typedText]= useState('')
    const[searchList,setsearchList]=useState([])
    const[searchResult,setResult]=useState([{}])
    const[sId,setsId]=useState('')
    const searchEng=useRef(null)
    const autoDelete=useRef(null)
   
    ////////////////////////////////Search Engine
    useEffect(()=>{
      if(mytext==''){
       searchEng.current.className='non'
      }
      else if(mytext!=''){
        searchEng.current.className='searchResults'
      }
      axios.get('/searchUser',{
        params:{
          text:mytext
        }
      }).then(function(response){
        setResult(response.data)
      })
    },[mytext])

    const addpotential=(id)=>{
      const finder=(element)=>element==id
      if(searchList.findIndex(finder)<0){
        setsearchList(searchList.concat(id))
      }
      
      
    }
    /////////////////////////////// New Room
    const onTurnin=(e)=>{
     
        e.preventDefault()
        if(searchList.length>1){
            const groupPayload={
              roomId:searchList.toString(),
              from:uid,
              to:searchList.toString(),
              people:searchList.concat(uid),
            }
            axios.post('/newRoom',groupPayload)  
           typedText('')
           setsearchList(['Refresh the page to see your new chat'])
      
        }else{
        axios.get('/signUpe',{
          params:{
            userId:mytext
          }
        }).then(function(fresponse){
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
      else if(fresponse.data==null){
        alert('This user does not exist')
      }
      else{
        const roomPayload={
          roomId:uid+'&'+mytext,
          from:uid,
          to:mytext,
          people:searchList.concat(uid),
        }
        axios.post('/newRoom',roomPayload)  
     typedText('')
     setsearchList(['Refresh the page to see your new chat'])
      }
      })
    })
       
  }     
          
    }
  return(
    <div className="Friends"  onSubmit={onTurnin}>
      <h1>Search the person up, click them on the dropdown, press submit</h1>
      <div className='potentialGroup'>{searchList.map(list=><button className='nameTag' >{list}</button>)}</div>
         <form>
        <input ref={autoDelete} className='tt'type='text' placeholder={"Who do you want to talk to?"} value={mytext} 
        onChange={(e)=> typedText(e.target.value)}>
        </input>
        <input className='tb' type="submit"></input>
        </form>
        <div className='searchResults' ref={searchEng}>{searchResult.length>0?searchResult.map(result=>
        <button className='singleResult' onClick={()=>{addpotential(result.userId);typedText(result.userId)}}>{result.userId}</button>):<div></div>}</div>
    </div>
  )
}

export default Friends