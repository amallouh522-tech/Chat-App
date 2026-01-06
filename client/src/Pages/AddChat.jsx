import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate } from 'react-router-dom';
import { MustLogin } from '../JS/mustLogin';

export default function AddChat() {

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
        <div className='AddChat'>
            <NavBar
                PageName={"Add chat"}
                url1={["/addpost", "Add new Post"]}
                url2={["/chat", "Chat"]}
                url3={["/home", "Home"]}
                url4={["/profile", "Profile"]}
                url5={["/logout", "Logout"]}
            />
            <div className="inputs">
                <input type="text" className="inp" placeholder="Chat Name" />
                <input type="text" className="inp" placeholder="Add user ID" />
                <button className="btn">Add Chat</button>
            </div>
        </div>
    )
}
