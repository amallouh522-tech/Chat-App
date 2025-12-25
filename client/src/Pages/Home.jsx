import React from 'react'
import NavBar from '../Components/NavBar'
import OpenedChats from '../Components/OpenedChats'

export default function Home() {
  return (
    <div className='Home'>
      <NavBar
        PageName={"Home"}
        url1={["/addpost", "Add new Post"]}
        url2={["/chat", "Chat"]}
        url3={["/logout" , "Logout"]}
      />
      <div className="content">
        <OpenedChats/>
      </div>
    </div>
  )
}
