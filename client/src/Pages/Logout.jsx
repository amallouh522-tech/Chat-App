import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Logout() {

  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/')
  } , [] )
  return (
    <div>
        <h3>Loging out ...</h3>
    </div>
  )
}
