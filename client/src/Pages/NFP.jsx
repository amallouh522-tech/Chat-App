import React from 'react'
import NavBar from '../Components/NavBar'

export default function NFP() {
  return (
    <div className='NFP'>
      <NavBar
        PageName={"NFP"}
        url1={["/" , "Login"]}
        url2={["/signup" , "Sign UP"]}
        url3={[]}
        url4={[]}
      />
        <h2>Error num : 404</h2>
        <h3>This page wasnt Fount</h3>
    </div>
  )
}
