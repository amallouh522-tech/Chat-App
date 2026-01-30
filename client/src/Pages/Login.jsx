import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { LoginFetch } from '../JS/LoginFetch';
import { MustLogin } from '../JS/mustLogin';
import { handleEnterKey } from '../JS/Onkeydown';
import { useUserContext } from '../Hooks/UserContext';

export default function Login() {
    const { user, setUser } = useUserContext();


    const usernameRef = useRef();
    const passwordRef = useRef();

    const [msg, setmsg] = useState();

    const navigate = useNavigate();


    useEffect(() => {
        async function Check() {
            const result = await MustLogin();
            if (result) {
                navigate("/home");
            };
        };
        Check();
    }, [])


    async function LoginResult() {

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const Lresult = await LoginFetch(username, password);
        if (Lresult.succ) {
            setUser({
                username: username,
                RID: Lresult.RID,
            });
            
            navigate("/home");
        } else {
            setmsg(Lresult.msg);
        };
    }

    return (
        <div className='Login'>
            <div className="head">
                <h2>Login Page</h2>
            </div>
            <div className="inputs">

                <h2 style={{ color: "red" }}>{msg}<br /></h2>
                <input ref={usernameRef} placeholder='Enter username' type="text" key={1} className="inp" />
                <input id='password' onKeyUp={(e) => handleEnterKey(e, LoginResult)} ref={passwordRef} placeholder='Enter password' type="password" key={2} className="inp" />
                <button className='btn' onClick={LoginResult}> Login </button>
                <p> Don't have an account yet? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    )
}
