import React from 'react'
import { Link } from "react-router-dom";
export default function Content_id({ChatID , chatname}) {
  return (
    <Link to={`/chat?chatid=${ChatID}`} className='Content-id'>
        <img src="./img/username.png" />
        <h2>{chatname} </h2>
    </Link>
  )
}
