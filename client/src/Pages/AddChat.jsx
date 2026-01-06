import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddChat() {
    const nameRef = useRef(null);
    const userIdRef = useRef(null);
    const nav = useNavigate();

    async function addChat() {
        const chatName = nameRef.current.value.trim();
        const userId = userIdRef.current.value.trim();

        if (!userId) {
            alert("اكتب ID المستخدم، مش رقم خيالي");
            return;
        }

        try {
            const res = await axios.post(
                "/api/chat/create",
                {
                    name: chatName,
                    userId
                },
                {
                    withCredentials: true
                }
            );

            if (!res.data.success) {
                alert(res.data.msg);
                return;
            }

            nav(`/chat/${res.data.chatId}`);
        } catch (err) {
            console.error(err);
            alert("صار خطأ، السيرفر مش بمزاجه");
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
