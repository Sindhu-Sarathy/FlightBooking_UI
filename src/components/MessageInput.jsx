import React from 'react';
import { useState } from 'react';

const MessageInput = ({onSend}) => {
    const[text,setText]=useState("");

    const handleSend=()=>{
        if(!text.trim())return;
        onSend(text);
        setText("");
    };
  return (
    <div style={{display:"flex",marginTop:"10px"}}>
        <input value={text} onChange={(e)=> setText(e.target.value)} style={{flex:1,padding:"10px"}} placeholder='Ask about Flights...'>
        <button onClick={handleSend} style={{padding: "10px"}}>send</button>
        
        </input>
    </div>
  )
}

export default MessageInput