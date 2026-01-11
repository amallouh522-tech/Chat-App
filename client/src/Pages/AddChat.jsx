import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/NavBar";
import { MustLogin } from "../JS/mustLogin";

export default function AddChat() {
    const nameRef = useRef(null);
    const userIdRef = useRef(null);
    const nav = useNavigate();
    const [msg, setmsg] = useState(null);
    useEffect(() => {
        async function Check() {
            const result = await MustLogin();
            if (!result) {
                nav("/");
            };
        };
        Check();
    })

    async function addChat() {
        const chatName = nameRef.current.value.trim();
        const userId = userIdRef.current.value.trim();

        if (!userId) {
            setmsg(["Enter userID", "red"]);
            return;
        }

        if (!chatName) {
            setmsg(["Enter Chat name Please", "red"]);
            return;
        }

        try {
            const res = await axios.post(
                "/api/chat/create",
                { name: chatName, userId },
                { withCredentials: true }
            );

            if (!res.data.success) {
                setmsg([res.data.msg, "red"]);
                return;
            } else {
                setmsg(["Add chat Successed", 'green']);
                nav(`/chat?chatid=${res.data.chatId}`);
            }
        } catch (err) {
            console.error(err);
            setmsg(["server error Please try again", "red"]);
        }
    }

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
                <h2 style={{color : msg ? msg[1] : "black" , textAlign:"center"}}>{msg ? msg[0] : <br />}</h2>
                <input
                    ref={nameRef}
                    type="text"
                    className="inp"
                    placeholder="Chat Name"
                />

                <input
                    ref={userIdRef}
                    type="text"
                    className="inp"
                    placeholder="Add user ID"
                />

                <button onClick={addChat} className="btn">
                    Add Chat
                </button>
            </div>
        </div>
    );
}
