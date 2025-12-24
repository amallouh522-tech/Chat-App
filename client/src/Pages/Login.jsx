import React from 'react'
import { Link } from "react-router-dom";
export default function Login() {
    return (
        <div className='Login'>
            <div className="head">
                    <h2>Login Page</h2>
                </div>
            <div className="inputs">
                
                <h2><br /></h2>
                <input placeholder='Enter username' type="text" key={1} className="inp" />
                <input placeholder='Enter password' type="password" key={2} className="inp" />
                <button className='btn'> Login </button>
                <p> Have not accout yet <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    )
}
