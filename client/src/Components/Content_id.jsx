import React from 'react'
import { Link } from "react-router-dom";
export default function Content_id({id , username , num}) {
  return (
    <Link key={id} className='Content-id'>
        <img src="./img/username.png" />
        <h2>{username} { num}</h2>
    </Link>
  )
}
