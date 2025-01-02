import React, { useState } from "react";
import styles from "../Messages.module.css";

const MessageList = ({ messages, typing, activeFriend, scrollRef, handleReaction }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const reactions = ["👍", "👎", "😂", "❤️", "😱"];

  const handleReactionClick = (messageId, reaction) => {
    handleReaction(messageId, reaction);
    setSelectedMessage(null);  // Close the reaction menu
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.friend}`}
          onClick={() => handlereaction(index)} // Pass the index to toggle for the specific message
        >
          {msg.sender === "friend" && (
            <img
              src={activeFriend?.profile?.profileImage || "/default-avatar.png"}
              alt="friend"
              className={styles.messageAvatar}
            />
          )}
          <span className={styles.messageText}>{msg.text}</span>
          
          {/* Show reaction window only for the clicked message */}
          {reactionWindow === index && (
            <div className={styles.reactionWindow}>
              {/* Add your reaction options here, like emojis */}
              <button>👍</button>
              <button>❤️</button>
              <button>😂</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
