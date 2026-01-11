import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import OpenedChats from '../Components/OpenedChats'
import Posts from '../Components/Posts'
import { Link, useNavigate } from "react-router-dom";
import { MustLogin } from '../JS/mustLogin';
import { useUserContext } from '../Hooks/UserContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  async function Check() {
    const result = await MustLogin();
    if (!result) {
      navigate("/");
    };
  };

  useEffect( () => {
    Check();
  }, []);

  function Username() {
    if (!user) return null;
    return(
      <div>
        <h2 className='helloworld' style={{display:"inline-block"}}>Hello , </h2>
        <Link className='hellousername' to={"/profile"}> {user?.username}</Link>
      </div>
    );
  };

  return (
    <div className='Home'>
      <NavBar
        PageName={<Username/>}
        url1={["/addpost", "Add new Post"]}
        url2={["/chat", "Chat"]}
        url3={["/addchat", "Add new Chat"]}
        url4={["/profile" , "Profile"]}
        url5={["/logout" , "Logout"]}
      />
      <div className="content">
        <OpenedChats />
        <Posts />
      </div>
    </div>
  )
}
