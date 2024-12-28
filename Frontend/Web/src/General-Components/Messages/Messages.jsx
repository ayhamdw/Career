import React, { useState, useEffect, useRef } from "react";
import styles from "./Messages.module.css";
import axios from "axios";
import io from "socket.io-client";

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isFriendsVisible, setIsFriendsVisible] = useState(true);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const myId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [reactionWindow, setReactionWindow] = useState(false);
  const socket = useRef();

  useEffect(() => {
    const myId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/friends/acceptedFriends/${myId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFriends(response.data);
      } catch (e) {
        setFriends([]);
        console.error("Error Fetch Friends: ", e);
      }
    };
    fetchFriends();
  }, []);

  const fetchMessages = async (friendId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/messages/messages/${myId}/${friendId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const processedMessages = response.data.map((msg) => ({
        text: msg.messageText,
        sender: msg.senderId._id === myId ? "user" : "friend",
        timeStamp: msg.timeStamp,
      }));

      setMessages(processedMessages);
    } catch (e) {
      console.error("Error Fetching Messages: ", e);
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== "" && activeFriend) {
      const newMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/messages/messages`,
          {
            senderId: myId,
            receiverId: activeFriend._id,
            messageType: "text",
            messageText: input,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        socket.current.emit("sendMessage", {
          sender: myId,
          receiver: activeFriend._id,
          messageText: input,
        });

        // Emit 'stopTyping' after sending the message
        socket.current.emit("stopTyping", {
          sender: myId,
          receiver: activeFriend._id,
        });
      } catch (error) {
        console.log("Error Send Messages: ", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleFriendClick = (friend) => {
    setActiveFriend(friend);
    setMessages([]);
    fetchMessages(friend._id);
  };

  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", {
        sender: myId,
        receiver: activeFriend._id,
      });
    }
  };

  const handleStopTyping = () => {
    setTyping(false);
    socket.current.emit("stopTyping", {
      sender: myId,
      receiver: activeFriend._id,
    });
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.current = io("http://localhost:7777", {
      transports: ["websocket"],
    });

    socket.current.on("receiveMessage", (message) => {
      if (message.sender === activeFriend._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.messageText, sender: "friend" },
        ]);
      }
    });

    socket.current.on("typing", (data) => {
      if (data.receiver === myId) {
        setTyping(true);
      }
    });

    socket.current.on("stopTyping", (data) => {
      if (data.receiver === myId) {
        setTyping(false);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [activeFriend]);

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

  const handlereaction = (index) => {
    setReactionWindow(reactionWindow === index ? null : index);
  }

  return (
    <div className={styles.chatSystem}>
      <div className={styles.chatMain}>
        {isFriendsVisible && (
          <div className={styles.friendsList}>
            <h3>Friends</h3>
            <ul>
              {friends.map((friend) => (
                <li
                  key={friend._id}
                  className={
                    activeFriend?.profile?.firstName === friend.profile.firstName
                      ? styles.active
                      : ""
                  }
                  onClick={() => handleFriendClick(friend)}
                >
                  <img
                    src={friend.profile.profileImage}
                    alt={friend.profile.firstName}
                  />
                  <div className={styles.friendInfo}>
                    <span>{friend.profile.firstName} {friend.profile.lastName}</span>
                    <p>{friend.profile.bio || "No bio available"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            {activeFriend && (
              <img
                src={activeFriend?.profile?.profileImage || "/default-avatar.png"}
                alt={activeFriend?.profile?.firstName || "Friend"}
              />
            )}
            <h3>{activeFriend?.profile?.firstName} {activeFriend?.profile?.lastName}</h3>
          </div>
          <div className={styles.messagesList} ref={scrollRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.friend}`}
                onClick={() => handlereaction(index)}
              >
                {msg.sender === "friend" && (
                  <img
                    src={activeFriend?.profile?.profileImage || "/default-avatar.png"}
                    alt="friend"
                    className={styles.messageAvatar}
                  />
                )}


                {reactionWindow === index && msg.sender === "user" && (
                  <div className={msg.sender === "user" ? styles.reactionWindowUser : styles.reactionWindowFriend}>
                    <div>
                      <button>👍</button>
                      <button>❤️</button>
                      <button>😂</button>
                      <button>😢</button>
                    </div>
                    <div>
                      <button>😎</button>
                      <button>🔥</button>
                      <button>🎉</button>
                      <button>👏</button>
                    </div>
                  </div>
                )}

                <span className={styles.messageText}>{msg.text}</span>
                {reactionWindow === index && msg.sender !== "user" && (
                  <div className={msg.sender === "user" ? styles.reactionWindowUser : styles.reactionWindowFriend}>
                    <div>
                      <button>👍</button>
                      <button>❤️</button>
                      <button>😂</button>
                      <button>😢</button>
                    </div>
                    <div>
                      <button>😎</button>
                      <button>🔥</button>
                      <button>🎉</button>
                      <button>👏</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {typing && activeFriend && (
              <div className={styles.typingIndicator}>
                <span>{activeFriend.profile.firstName} is typing...</span>
              </div>
            )}
          </div>

          <div className={styles.messageInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleTyping}
              onBlur={handleStopTyping}
              placeholder={
                activeFriend
                  ? `Message ${activeFriend.profile.firstName}...`
                  : "Select a friend to start chatting"
              }
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>


      {isInfoVisible && activeFriend && (
        <div className={styles.chatInfo}>
          <div className={styles.infoHeader}>
            <img
              src={activeFriend.profile.profileImage}
              alt={activeFriend.profile.firstName}
            />
            <div>
              <h3>{activeFriend.profile.firstName} {activeFriend?.profile?.lastName}</h3>
              <p>{activeFriend.profile.bio || "Bio not available"}</p>
              <a href={`mailto:${activeFriend.email}`}>Contact via Email</a>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ChatSystem;