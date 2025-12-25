import React from 'react'
import NavBar from '../Components/NavBar'
import OpenedChats from '../Components/OpenedChats'
import Posts from '../Components/Posts'

export default function Home() {
  return (
    <div className='Home'>
      <NavBar
        PageName={"Home"}
        url1={["/addpost", "Add new Post"]}
        url2={["/chat", "Chat"]}
        url3={["/logout" , "Logout"]}
        url4={[]}
      />
      <div className="content">
        <OpenedChats/>
        <Posts/>
      </div>
    </div>
  )
}
