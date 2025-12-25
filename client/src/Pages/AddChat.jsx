import React from 'react'
import NavBar from '../Components/NavBar'

export default function AddChat() {
    return (
        <div className='AddChat'>
            <NavBar
                PageName={"Home"}
                url1={["/addpost", "Add new Post"]}
                url2={["/chat", "Chat"]}
                url3={["/home" , "Home"]}
                url4={["/logout", "Logout"]}
            />
            <div className="inputs">
                <input type="text" className="inp" placeholder="Chat Name" />
                <input type="text" className="inp" placeholder="Add user ID" />
                <button className="btn">Add Chat</button>
            </div>
        </div>
    )
}
