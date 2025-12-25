import React from 'react'

export default function ChatSide() {
  return (
    <div className='chatSide'>
      <div className="masseges">

      </div>
      <div className="inputs">
        <input className='inp' type="text" placeholder='Type your massege...' />
        <button className='btn'>Send</button>
      </div>
    </div>
  )
}
