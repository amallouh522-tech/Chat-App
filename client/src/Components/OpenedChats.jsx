import React, { useEffect, useState } from 'react'
import Content_id from './Content_id'
import { Link } from "react-router-dom"
import axios from 'axios';

export default function OpenedChats() {

  const [Chats , setChats] = useState([]);
  async function fetchChats(){
    const res = await axios.post("/api/fetchchats");
    setChats(res.data.result);
  }

  useEffect(()=>{
    fetchChats();
  },[])

  function RenderChats(){
    return Chats.map((chat)=>{
      return <Content_id ChatID={chat.Chatid} key={chat.Chatid} chatname={chat.Chatname} />
    })
  }

  return (
    <div className='openedchats'>
      <div style={{display:"flex" , justifyContent:"space-around" , margin:"10px 0"}} className="head">
        <h2 style={{display:"inline-block"}}>Chat</h2>
        <Link to={"/addchat"} style={{display:"inline-block" , fontSize:"24px" , textDecoration:"none" , color:"black"}}>+</Link>
      </div>
      <div className="content-Id">
        <RenderChats />
      </div>
    </div>
  )
}
