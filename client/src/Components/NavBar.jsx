import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar({PageName , url1 , url2 , url3 , url4}) {
  return (
    <div className='navBar'>
        <nav>
            <h2>{PageName}</h2>
            <ul>
                <li><Link to={url1[0]}>{url1[1]}</Link></li>
                <li><Link to={url2[0]}>{url2[1]}</Link></li>
                <li><Link to={url3[0]}>{url3[1]}</Link></li>
                <li><Link to={url4[0]}>{url4[1]}</Link></li>
            </ul>
        </nav>
    </div>
  )
}
