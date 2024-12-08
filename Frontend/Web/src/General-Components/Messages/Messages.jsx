import React, { useState } from "react";
import "./ChatSystem.css";

const ChatSystem = () => {
  const [friends] = useState([
    { name: "Khaled", picture: "https://via.placeholder.com/50", bio: "Coffee enthusiast.", page: "#" },
    { name: "Mays", picture: "https://via.placeholder.com/50", bio: "Loves painting.", page: "#" },
    { name: "Abdullah", picture: "https://via.placeholder.com/50", bio: "Tech guru.", page: "#" },
    { name: "Ayham", picture: "https://via.placeholder.com/50", bio: "Avid reader.", page: "#" },
    { name: "Shareef", picture: "https://via.placeholder.com/50", bio: "Loves traveling.", page: "#" },
    { name: "Dania", picture: "https://via.placeholder.com/50", bio: "Music lover.", page: "#" },
    { name: "Abeer", picture: "https://via.placeholder.com/50", bio: "Fitness fanatic.", page: "#" },
  ]);
  const [activeFriend, setActiveFriend] = useState(friends[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is an auto-response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleFriendClick = (friend) => {
    setActiveFriend(friend);
    setMessages([]);
  };

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
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.sender === "bot" && (
                  <img src={activeFriend.picture} alt="friend" className="message-avatar" />
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
    </div>
  );
};

export default ChatSystem;
