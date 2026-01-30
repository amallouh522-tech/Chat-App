import React from 'react'
import NavBar from '../Components/NavBar'

export default function NFP() {
  return (
    <div className='NFP'>
      <NavBar
        PageName={"NFP"}
        url1={["/addchat" , "Add new Chat"]}
        url2={["/chat" , "chat"]}
        url3={["/home" , "Home"]}
        url4={["/addpost", "add new post"]}
        url5={["/addchat" , "add chat"]}
        url6={["/server/add" , "Add Server"]}
      />
        <h2>Error num : 404</h2>
        <h3>This page wasnt Fount</h3>
    </div>
  )
}
