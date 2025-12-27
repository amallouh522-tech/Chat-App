import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import ChatSide from '../Components/ChatSide'
import OpenedChats from '../Components/OpenedChats'
import { useNavigate } from "react-router-dom";
import { MustLogin } from '../JS/mustLogin';

export default function Chat() {

  const navigate = useNavigate();

  useEffect(() => {
    async function Check() {
      const result = await MustLogin();
      if (!result) {
        navigate("/");
      };
    };
    Check();
  }, []);
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

