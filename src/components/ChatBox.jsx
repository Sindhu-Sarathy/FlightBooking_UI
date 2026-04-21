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
       <div style={styles.container}>
      <h2>✈️ Flight Booking Assistant</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#DCF8C6" : "#fff",
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div style={styles.loading}>AI is thinking...</div>
        )}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about flights or booking..."
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
    );
};

const styles = {
  container: {
    width: "1000px",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  chatBox: {
    height: "400px",
    border: "1px solid #ccc",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: "#f9f9f9",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "75%",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  loading: {
    fontStyle: "italic",
    color: "gray",
  },
};

export default ChatBox;