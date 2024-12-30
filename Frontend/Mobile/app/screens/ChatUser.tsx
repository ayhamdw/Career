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
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

import styles from "@/assets/styles/ChatUserStyle";
import { ayhamWifiUrl } from "../../constants/Urls";

const ChatUser = ({ user }) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [receiverDetails, setReceiverDetails] = useState();
  const [messages, setMessages] = useState([]);

  const scrollViewRef = useRef(null);
  const route = useRoute();
  const { me } = route.params;
  const userId = user?._id;
  const senderId = me?._id || userId;
  const receiverId = route.params?.user._id ?? "";
  const image = route.params?.user.profile.profileImage ?? "";
  const navigation = useNavigation();
  const handelEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const receiverData = await axios.get(
          `${ayhamWifiUrl}/api/messages/getChatUserDetails/${receiverId}`,
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSendMessage = async (messageType: string, imageUri: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("senderId", senderId); //* Append senderId to the form data
      formData.append("receiverId", receiverId); //* Append receiverId to the form data

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
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("");
        setSelectedImage("");
        fetchMessages();
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/messages/messages/${senderId}/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessages(response.data);
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
          <Image style={styles.imageStyle} source={image} />
          <Text style={styles.nameStyle}>
            {receiverDetails
              ? receiverDetails.profile.firstName +
                " " +
                receiverDetails.profile.lastName
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        ref={scrollViewRef} // Step 2: Attach the reference to ScrollView
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        } // Auto-scroll on content change
      >
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
          } else if (item.messageType === "image") {
            const baseUrl = `${ayhamWifiUrl}/assets/images/`;
            const imageUrl = item.messageUrl;
            const fileName = imageUrl.split("\\").pop();
            const source = { uri: baseUrl + fileName };
            console.log(source);
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === senderId
                    ? styles.senderMessageStyle
                    : styles.receiverMessageStyle,
                ]}
              >
                <Image source={source} style={{ height: 200, width: 200 }} />
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
