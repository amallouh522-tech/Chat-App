import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { SignUPFetch } from '../JS/LoginFetch.js';
import { handleEnterKey } from '../JS/Onkeydown.js';

export default function Signup() {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const EmailRef = useRef();

  const [msg, setmsg] = useState([]);

  async function SignUpResult() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = EmailRef.current.value;

    const Sresult = await SignUPFetch(username, password, email);
    if (Sresult.succ) {
      setmsg(["green", "Signup successful"]);
    } else {
      setmsg(["red", Sresult.msg || "Error while signing up"]);
    };
  };

  return (
    <div className='Login'>
      <div className="head">
        <h2>Sign UP Page</h2>
      </div>
      <div className="inputs">
        <h2 style={{ color: msg ? msg[0] : "black" }}>{msg ? msg[1] : <br />}</h2>
        <input onKeyUp={(e) => {
          if (e.key === "Enter") {
            usernameRef.current.focus();
          }
        }} ref={usernameRef} placeholder='Enter username' type="text" key={1} className="inp" />
        <input onKeyUp={(e) => {
          if (e.key === "Enter") {
            passwordRef.current.focus();
          }
        }} ref={EmailRef} placeholder='Enter Email' type="text" key={2} className="inp" />
        <input onKeyUp={(e) => handleEnterKey(e, SignUpResult)} ref={passwordRef} placeholder='Enter password' type="password" key={3} className="inp" />
        <button onClick={SignUpResult} className='btn'> Sign UP </button>
        <p> already have account ? <Link to={"/"}>Login</Link></p>
      </div>
    </div>
  )
}
