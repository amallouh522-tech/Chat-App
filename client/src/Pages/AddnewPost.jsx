import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate } from 'react-router-dom';
import { MustLogin } from '../JS/mustLogin';
import { Addpostfetch } from '../JS/Addnewpost';

export default function AddnewPost() {
    const navigate = useNavigate();

    const [msg, setmsg] = useState([]);

    const TitleRef = useRef();
    const TextRef = useRef();
    const ImgRef = useRef();

    useEffect(() => {
        async function Check() {
            const result = await MustLogin();
            if (!result) {
                navigate("/");
            };
        };
        Check();
    }, []);


    async function AddPost() {
        const title = TitleRef.current.value;
        const text = TextRef.current.value;
        const img = ImgRef.current.files[0];
        if (!title || !text) {
            setmsg(["red", "Please Enter data"]);
        } else {
            try {
                const result = await Addpostfetch(text, title, img);
                if (result.succ) {
                    setmsg(["green", "post Added"]);
                } else {
                    setmsg(["red", "Error while Adding"]);
                };
            } catch (error) {
                if (error) {
                    console.error(error);
                };
            };
        };
    };

    return (
        <div className='Addpost'>
            <NavBar
                PageName={"Add new post"}
                url1={["/home", "Home"]}
                url2={["/chat", "Chat"]}
                url3={["/addchat", "Add new Chat"]}
                url4={["/profile", "Profile"]}
                url5={["/logout", "Logout"]}
            />
            <div className="inputs">
                <div style={{ textAlign: 'center' }} className="head">
                    <h2 style={{ color: msg ? msg[0] : "black" }}>{msg ? msg[1] : <br />}</h2>
                </div>
                <input ref={TitleRef} placeholder='enter Post title' className='inp' type="text" />
                <input ref={TextRef} placeholder='enter Post content' className='inp' type="text" />
                <input ref={ImgRef} type="file" className='inp' accept="image/*,video/*" />
                <button onClick={AddPost} className="btn">Post</button>
            </div>
        </div>
    )
}
