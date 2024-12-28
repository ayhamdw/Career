import React, { useState, useEffect } from "react";
import styles from "../Messages.module.css";

const MessageInput = ({ input, setInput, sendMessage, handleKeyDown, handleTyping, handleStopTyping }) => {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    handleTyping();  

    setTypingTimeout(
      setTimeout(() => {
        handleStopTyping();  
      }, 1500)
    );
  };

  return (
    <div className={styles.messageInputContainer}>
      <textarea
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className={styles.messageInput}
      />
      <button
        onClick={sendMessage}
        className={styles.sendButton}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
