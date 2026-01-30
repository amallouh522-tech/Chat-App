import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/NavBar";
import { MustLogin } from "../JS/mustLogin";
import { useServerContext } from '../Hooks/ServerContext';
import socket from '../JS/socket';

export default function AddServer() {
    const nameRef = useRef(null);
    const userIdRef = useRef(null);
    const nav = useNavigate();
    const [msg, setmsg] = useState(null);

    const ServerRef = useRef();
    const { Server, SetServer } = useServerContext();

    useEffect(() => {
        async function Check() {
            const result = await MustLogin();
            if (!result) {
                nav("/");
            };
        };
        Check();
    })

    function ServerFunc() {
        SetServer({ ServerName: ServerRef.current.value });
        ServerRef.current.value = "";
    }

    useEffect(() => {
        socket.emit("loadPosts", Server);
    }, [Server.ServerName]);

    return (
        <div className='AddChat'>
            <NavBar
                PageName={"Add chat"}
                url1={["/addpost", "Add new Post"]}
                url2={["/chat", "Chat"]}
                url3={["/home", "Home"]}
                url4={["/profile", "Profile"]}
                url5={["/addchat", "Add Chat"]}
                url6={["/logout", "Logout"]}
            />

            <div className="inputs">
                <h2 style={{ color: msg ? msg[1] : "black", textAlign: "center" }}>{msg ? msg[0] : <br />}</h2>
                <input
                    ref={nameRef}
                    type="text"
                    className="inp"
                    placeholder="Server Name"
                />

                <button className="btn">Add Server</button>
            </div>
            <div className="inputs">
                <li className='Join'>
                    <input ref={ServerRef} type="text" className="Join_inp" placeholder='Join Server' />
                    <button onClick={ServerFunc} className='Join_btn'>🌐</button>
                </li>
            </div>
        </div>
    );
}
