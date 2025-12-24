import React from 'react'
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className='Login'>
      <div className="head">
        <h2>Sign UP Page</h2>
      </div>
      <div className="inputs">
        <h2><br /></h2>
        <input placeholder='Enter username' type="text" key={1} className="inp" />
        <input placeholder='Enter username' type="text" key={2} className="inp" />
        <input placeholder='Enter password' type="password" key={3} className="inp" />
        <button className='btn'> Sign UP </button>
        <p> already have account ? <Link to={"/"}>Login</Link></p>
      </div>
    </div>
  )
}
