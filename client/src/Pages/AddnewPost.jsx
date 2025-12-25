import React from 'react'
import NavBar from '../Components/NavBar'

export default function AddnewPost() {
    return (
        <div className='Addpost'>
            <NavBar
                PageName={"Add new post"}
                url1={["/home", "Home"]}
                url2={["/chat", "Chat"]}
                url3={["/logout", "Logout"]}
                url4={[]}
            />
            <div className="inputs">
                <h2><br /></h2>
                <input placeholder='enter Post title' className='inp' type="text" />
                <input placeholder='enter Post content' className='inp' type="text" />
                <button className="btn">Post</button>
            </div>
        </div>
    )
}
