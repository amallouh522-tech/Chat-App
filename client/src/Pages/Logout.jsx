import React from 'react'
import { useNavigate } from "react-router-dom";
import { LogoutFetch } from '../JS/Logout';

export default function Logout() {

  const navigate = useNavigate();

  React.useEffect(() => {
    async function Check() {
      const result = await LogoutFetch();
      if (result) {
        navigate("/");
      }
    }
    
    Check();
  } , [] )
  return (
    <div>
        <h3>Loging out ...</h3>
    </div>
  )
}
