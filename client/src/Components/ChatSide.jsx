import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import socket from '../JS/socket'
import axios from 'axios';
import { useUserContext } from '../Hooks/UserContext';
export default function ChatSide() {
  const { user } = useUserContext();
  const massegeRef = useRef();

  const [searchParams] = useSearchParams();
  const Chatid = searchParams.get("chatid");

  const [masseges, setmasseges] = useState();
  const [msg, setmsg] = useState();

  function Loadmasseges() {
    if (Chatid) {
      socket.emit("loadMasseges", Chatid);
      socket.on("loadMassegesR", (result) => {
        if (!result) {
          setmasseges(null)
        } else {
          setmasseges(result);
        }
      });
    };
  }
  useEffect(() => {
    Loadmasseges();
  });

  async function SendMassege() {
    const massege = massegeRef.current.value;
    if (!Chatid) {
      setmsg("Please Choose chat ...");
      massegeRef.current.value = "";
      setTimeout(() => {
        setmsg(null);
      }, 3000);
    } else {
      socket.emit("Sendmsg", massege);
      const res = await axios.post("/msg/send", { massege, Chatid }, { withCredentials: true });
      const result = await res.data;
      if (result.succ) {
        setmsg("msg was sended");
        massegeRef.current.value = "";
        setTimeout(() => {
          setmsg(null);
        }, 3000);
      } else {
        setmsg("Error while sending");
      };
    }

  };

  function Viewmsgs() {
    if (!masseges) {
      return (
        <h2 style={{ color: "red", textAlign: "center" }}>No masseges in this groub</h2>
      )
    } else {
      return masseges.map((massege) => {
        if (massege.sender == user.RID) {
          return <div key={massege.msgid} className='msg'>
            <p className='sender'>{massege.sender}</p>
            <h2>{massege.content}</h2>
          </div>
        } else {
          return <div key={massege.msgid} className='rmsg'>
            <p className='rsender'>{massege.sender}</p>
            <h2 className='rcontent'>{massege.content}</h2>
          </div>
        }
      });
    };
  }

  return (
    <div className='chatSide'>
      <div className="masseges">
        <Viewmsgs />
      </div>
      <div className="inputs">
        <input ref={massegeRef} className='inp' type="text" placeholder={msg ? msg : 'Type your massege...'} />
        <button onClick={SendMassege} className='btn'>Send</button>
      </div>
    </div>
  )
}
