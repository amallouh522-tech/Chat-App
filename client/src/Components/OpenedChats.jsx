import React from 'react'
import Content_id from './Content_id'
import { Link } from "react-router-dom"


export default function OpenedChats() {
  return (
    <div className='openedchats'>
      <div style={{display:"flex" , justifyContent:"space-around" , margin:"10px 0"}} className="head">
        <h2 style={{display:"inline-block"}}>Chat</h2>
        <Link to={"/addchat"} style={{display:"inline-block" , fontSize:"24px" , textDecoration:"none" , color:"black"}}>+</Link>
      </div>
      <div className="content-Id">
      </div>
    </div>
  )
}
