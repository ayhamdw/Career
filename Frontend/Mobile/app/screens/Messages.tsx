import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Man1 from "../../assets/images/Messages/Man1.png";
import Man2 from "../../assets/images/Messages/Man2.png";
import Man3 from "../../assets/images/Messages/Man3.png";

import styles from "../../assets/styles/MessagesStyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string; // Include _id as it's used in the fetch call
  firstName: string;
  lastName: string;
  profileImage?: string;
  unreadMessages?: string;
  lastMessage?: string;
}

// Define the component props interface
interface MessagesProps {
  user: User; // Type the `user` prop with `User` interface
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [users, setUsers] = useState<User[]>([]); // Type users as an array of User

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = user._id;
        const response = await axios.get(
          `http://192.168.1.21:7777/api/user/logInUsers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data); // Save the users in the state
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [user._id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.chatTextStyle}>Chat</Text>
      <StatusBar backgroundColor={"red"} />
      <ScrollView style={styles.scrollView}>
        {users.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => console.log("Chat with", item.firstName)}
            style={styles.messageContainer}
          >
            <Image
              source={item.profileImage ? { uri: item.profileImage } : Man1}
              style={styles.imageStyle}
            />
            <View style={styles.messageBubble}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>
                  {`${item.firstName} ${item.lastName}`}
                </Text>
                <Text style={styles.numberOfMessages}>
                  {item.unreadMessages || "+0"}
                </Text>
              </View>
              <Text style={styles.messageText}>
                {item.lastMessage || "No recent messages"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
