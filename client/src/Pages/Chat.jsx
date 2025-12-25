import React from 'react'
import NavBar from '../Components/NavBar'
import ChatSide from '../Components/ChatSide'
import OpenedChats from '../Components/OpenedChats'

export default function Chat() {
  return (
    <div className='chat'>
      <NavBar
        PageName={"Chat"}
        url1={["/home", "Home"]}
        url2={["/addpost", "Add new post"]}
        url3={["/logout", "Logout"]}
        url4={[]}
      />
      <div className="content">
        <OpenedChats />
        <ChatSide />
      </div>
    </div>
  )
}

