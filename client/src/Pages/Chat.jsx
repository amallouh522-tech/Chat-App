import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import ChatSide from '../Components/ChatSide'
import OpenedChats from '../Components/OpenedChats'
import { useNavigate } from "react-router-dom";
import { MustLogin } from '../JS/mustLogin';

export default function Chat() {

  const navigate = useNavigate();

  async function Check() {
    const result = await MustLogin();
    if (!result) {
      navigate("/");
    };
  };


  useEffect(() => {
    Check();
  }, []);
  return (
    <div className='chat'>
      <NavBar
        PageName={"Chat"}
        url1={["/home", "Home"]}
        url2={["/addpost", "Add new post"]}
        url3={["/addchat", "Add new chat"]}
        url4={["/profile", "Profile"]}
        url5={["/logout", "Logout"]}
      />
      <div className="content">
        <OpenedChats />
        <ChatSide />
      </div>
    </div>
  )
}

