import React, { useState, useEffect, useRef } from "react";
import "./ChatSystem.css";

import image1 from './profile-images/1.png';
import image2 from './profile-images/2.png';
import image3 from './profile-images/3.png';
import image4 from './profile-images/4.png';
import image5 from './profile-images/5.png';
import image6 from './profile-images/6.png';
import image7 from './profile-images/7.png';

const ChatSystem = () => {
  const [friends] = useState([
    { name: "Khaled", picture: image1, bio: "Coffee enthusiast.", page: "#" },
    { name: "Mays", picture: image2, bio: "Loves painting.", page: "#" },
    { name: "Abdullah", picture: image4, bio: "Tech guru.", page: "#" },
    { name: "Ayham", picture: image6, bio: "Avid reader.", page: "#" },
    { name: "Shareef", picture: image7, bio: "Loves traveling.", page: "#" },
    { name: "Dania", picture: image3, bio: "Music lover.", page: "#" },
    { name: "Abeer", picture: image5, bio: "Fitness fanatic.", page: "#" },
    { name: "Masa", picture: image3, bio: "Fitness fanatic.", page: "#" },
    { name: "Lean", picture: image2, bio: "Fitness fanatic.", page: "#" },
  ]);
  const [activeFriend, setActiveFriend] = useState(friends[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isFriendsVisible, setIsFriendsVisible] = useState(true);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is an auto-response.", sender: "bot" },
        ]);
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleFriendClick = (friend) => {
    setActiveFriend(friend);
    setMessages([]);
  };


  const scrollRef = useRef();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleResize = () => {
    const width = window.innerWidth;
    setIsInfoVisible(width > 1200);
    setIsFriendsVisible(width > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (

      <div className="chat-system">
        <div className="friends-list">
          <h3>Friends</h3>
          <ul>
            {friends.map((friend, index) => (
              <li
                key={index}
                className={activeFriend.name === friend.name ? "active" : ""}
                onClick={() => handleFriendClick(friend)}
              >
                <img src={friend.picture} alt={friend.name} />
                <div className="friend-info">
                  <span>{friend.name}</span>
                  <p>{friend.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-main">
          <div className="chat-window">
            <div className="chat-header">
              <img src={activeFriend.picture} alt={activeFriend.name} />
              <h3>{activeFriend.name}</h3>
            </div>
            <div className="messages-list" ref={scrollRef}>
              
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                >
                  {msg.sender === "bot" && (
                    <img
                      src={activeFriend.picture}
                      alt="friend"
                      className="message-avatar"
                    />
                  )}
                  <span className="message-text">{msg.text}</span>
                  
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${activeFriend.name}...`}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>

        </div>
        <div className="chat-info">
            <div className="info-header">
              <img src={activeFriend.picture} alt={activeFriend.name} />
              <div>
                <h3>{activeFriend.name}</h3>
                <p>{activeFriend.bio}</p>
                <a href={activeFriend.page} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </div>
            </div>
            <div className="info-actions">
              <h4>Conversation Options</h4>
              <div className="action-icons">
                <button>
                  <span role="img" aria-label="photos">
                    📷
                  </span>
                  Photos
                </button>
                <button>
                  <span role="img" aria-label="files">
                    📁
                  </span>
                  Files
                </button>
                <button>
                  <span role="img" aria-label="links">
                    🔗
                  </span>
                  Links
                </button>
              </div>
            </div>
          </div>
      </div>

  );
};

export default ChatSystem;
