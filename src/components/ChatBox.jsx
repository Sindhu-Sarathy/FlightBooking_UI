import React from 'react';
import { useState } from 'react';
import { sendMessage } from '../services/flightApi';
import messageList from './messageList';
import MessageInput from './MessageInput';
import axios from 'axios';

const API_URL = "http://localhost:8082/api/flights/ai";

const ChatBox = () => {
    const[messages,setMessages]=useState([]);
    const[input,setInput]=useState("");
    const[loading,setLoading]=useState(false);

    const getSessionId=()=>{
        let id=localStorage.getItem("sessionId");
        if(!id){
            id=crypto.randomUUID();
            localStorage.setItem("sessionId",id);
        }

        return id;
    }

    const sessionId=getSessionId();

    const sendMessage=async()=>{
        console.log(sessionId);
        if(!input.trim()) return;
        console.log(input);
        const userMessage={role:"user",content:input};
        setMessages((prev)=> [...prev,userMessage]);
        setInput("");
        setLoading(true);
        console.log("Sending request...", sessionId, input);
        try{
             const res = await axios.get(API_URL, {
                params: {
                sessionId,
                message: input,
                },
      });
      console.log(res);
            const aiMessage={role: "assistant",content: res.data};
            setMessages((prev) => [...prev,aiMessage]);
        }
        catch(err){
            setMessages((prev) => [...prev,{role:"assistant",content:"Error connecting to the server"}]);
             console.error("FULL ERROR:", err);
            console.error("RESPONSE:", err.response);
        }

        setLoading(false);
    }
    return (
       <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className='text-center mb-3'>✈️ Flight Booking Assistant</h2>

      <div className="border rounded p-3 mb-3 bg-light d-flex flex-column"
        style={{ height: "400px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 mb-2 rounded ${
              msg.role === "user"
                ? "align-self-end bg-success text-white"
                : "align-self-start bg-white border"
            }`}
            style={{ maxWidth: "75%" }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-muted fst-italic">AI is thinking...</div>
        )}
      </div>

      <div className='input-group'>
        <input
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about flights or booking..."
          
        />

        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
    );
};



export default ChatBox;