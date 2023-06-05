import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.user}: {message.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatRoom;
