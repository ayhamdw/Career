import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ChatUser = ({ user }) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [receiverDetails, setReceiverDetails] = useState();
  const [messages, setMessages] = useState([]);

  const senderId = user._id;
  const route = useRoute();
  const receiverId = route.params?.user._id ?? "";
  const navigation = useNavigation();
  const handelEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const receiverData = await axios.get(
          `http://192.168.1.21:7777/api/user/getChatUserDetails/${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (receiverData.status === 200) {
          setReceiverDetails(receiverData.data);
        }
      } catch (error) {
        console.log("error while fetching user details", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSendMessage = async (messageType: string, imageUri: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("senderId", senderId); //* Append senderId to the form data
      formData.append("receiverId", receiverId); //* Append receiverId to the form data

      if (messageType === "image") {
        console.log("Image uri", imageUri);
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri, // Remove "file://" prefix if needed
          name: "image.jpg",
          type: "image/jpeg", // Ensure the correct MIME type
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      console.log("Sender ID:", formData.getAll("senderId"));
      console.log("Receiver ID:", formData.getAll("receiverId"));
      console.log("Message Type:", formData.getAll("messageType"));
      console.log("Image File:", formData.getAll("imageFile"));
      const response = await axios.post(
        "http://192.168.1.21:7777/api/user/messages",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Message sent successfully");
        setMessage("");
        setSelectedImage("");
        fetchMessages();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.1.21:7777/api/user/messages/${senderId}/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Messages fetched successfully");
        setMessages(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headerStyle}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/defaultProfile.png")}
          />
          <Text style={styles.nameStyle}>
            {receiverDetails
              ? receiverDetails.firstName + " " + receiverDetails.lastName
              : "Loading..."}
          </Text>
        </View>
      ),
    });
  }, [receiverDetails]);

  const formatTime = (timeStamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timeStamp).toLocaleString("en-US", options);
  };

  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleSendMessage("image", result.assets[0].uri);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === senderId
                    ? styles.senderMessageStyle
                    : styles.receiverMessageStyle,
                ]}
              >
                <Text style={styles.messageStyle}>{item.messageText}</Text>
                <Text style={styles.messageTimeStyle}>
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
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
          style={{ height: 250 }}
          onEmojiSelected={(emoji) =>
            setMessage((prevMessage) => prevMessage + emoji)
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  parentStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
  },
  emojiWithTextInputStyle: {
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  cameraWithMicAndSendButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sendButton: {
    backgroundColor: "#58D68D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  sendTextStyle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  nameStyle: {
    alignContent: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  senderMessageStyle: {
    alignSelf: "flex-end",
    backgroundColor: "#58D68D",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "60%",
  },
  receiverMessageStyle: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "60%",
    borderRadius: 10,
  },
  messageStyle: {
    color: "black",
    fontSize: 16,
  },
  messageTimeStyle: {
    marginTop: 5,
    color: "#5e5353 ",
    fontSize: 10,
    textAlign: "right",
  },
});
