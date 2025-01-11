import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  StatusBar,
  Platform,
  Keyboard,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import * as ImagePicker from "expo-image-picker";

import styles from "@/assets/styles/ChatGroupStyle";
import { ayhamWifiUrl } from "../../constants/Urls";

const ChatGroup = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupDetails, setGroupDetails] = useState(null);
  const [postOwner, setPostOwner] = useState(null);
  const scrollViewRef = useRef(null);
  const socket = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const group = route.params.group;
  const userId = route.params.userId;
  console.log("User ID:", userId);

  useEffect(() => {
    const fetchGroupMessages = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/messages/groupMessages/${group._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.message);
        setPostOwner(response.data.postOwner.user);
        console.log("Post Owner:", response.data.postOwner.user);
      } catch (error) {
        console.error("Error fetching group messages:", error);
      }
    };

    fetchGroupMessages();
  }, [group._id]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/community/getPostByPostId/${group._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroupDetails(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [group._id]);

  useEffect(() => {
    socket.current = io("http://192.168.1.13:7777", {
      transports: ["websocket", "polling"],
    });

    socket.current.emit("joinGroup", { groupId: group._id, userId });

    socket.current.on("receiveGroupMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.current.emit("leaveGroup", { groupId: group._id });
      socket.current.disconnect();
    };
  }, [group._id, userId]);

  const handleSendMessage = async (messageType, imageUri) => {
    if (message.trim() !== "" || imageUri) {
      try {
        const token = await AsyncStorage.getItem("token");
        const formData = new FormData();
        formData.append("senderId", userId);
        formData.append("postId", group._id);

        if (messageType === "image") {
          formData.append("messageType", "image");
          formData.append("imageFile", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
          });
        } else {
          formData.append("messageType", "text");
          formData.append("messageText", message);
        }

        const response = await axios.post(
          `${ayhamWifiUrl}/api/messages/messages`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const newMessage = response.data;
          setMessage("");
          socket.current.emit("sendGroupMessage", {
            groupId: group._id,
            message: newMessage,
          });
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handelEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleSendMessage("image", result.assets[0].uri);
    }
  };

  const formatTime = (timeStamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timeStamp).toLocaleString("en-US", options);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("GroupDetails", { group })}
          disabled={userId !== postOwner}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {groupDetails ? groupDetails.groupName : "Loading..."}
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [groupDetails]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((item, index) => {
          const isSender = item.senderId._id === userId;
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignSelf: isSender ? "flex-end" : "flex-start",
                marginHorizontal: 10,
                marginVertical: 5,
                maxWidth: "70%",
              }}
            >
              {!isSender && (
                <Image
                  source={{ uri: item.senderId.profile.profileImage }}
                  style={styles.imageStyle}
                />
              )}
              <View
                style={[
                  isSender
                    ? styles.senderMessageStyle
                    : styles.receiverMessageStyle,
                ]}
              >
                {!isSender && (
                  <Text style={styles.nameStyle}>
                    {item.senderId.profile.firstName}{" "}
                    {item.senderId.profile.lastName}
                  </Text>
                )}
                {item.messageType === "text" ? (
                  <Text style={styles.messageText}>{item.messageText}</Text>
                ) : (
                  <Image
                    source={{
                      uri: `${ayhamWifiUrl}/assets/images/${item.messageUrl
                        .split("\\")
                        .pop()}`,
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <Text style={styles.messageTimeStyle}>
                  {formatTime(item.timeStamp)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.parentStyle}>
        <View style={styles.emojiWithTextInputStyle}>
          <Entypo
            name="emoji-happy"
            size={24}
            color="black"
            onPress={handelEmojiPress}
          />
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.textInputStyle}
            placeholder="write your message"
          />
        </View>
        <View style={styles.cameraWithMicAndSendButtonStyle}>
          <Feather
            name="camera"
            size={24}
            color="black"
            onPress={() => handleImageSelect()}
          />
          <SimpleLineIcons name="microphone" size={24} color="black" />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSendMessage("text", "")}
          >
            <Text style={styles.sendTextStyle}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => setMessage((prev) => prev + emoji)}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatGroup;
