import React from 'react'

const messageList = ({messages}) => {
  return (
    <div style={{height:"400px",overflow:"auto",border:"1px solid #ccc",padding:"10px"}}>
        {messages.map((msg,index) => {
            <div key={index} style={{marginBottom:"10px"}}>
                <b>{msg.role}:</b>{msg.content}
            </div>
        })}
    </div>
  )
}

export default messageList

