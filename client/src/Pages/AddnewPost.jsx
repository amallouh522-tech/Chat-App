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
            />
        </div>
    )
}
