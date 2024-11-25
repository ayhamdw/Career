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
import { useNavigation } from "expo-router";
import { ayhamWifiUrl } from "@/constants/Urls";

interface User {
  _id: string;
  profile: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  email: string;
  unreadMessages?: string;
  lastMessage?: string;
}

interface MessagesProps {
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = user._id;
        const response = await axios.get(
          `${ayhamWifiUrl}/api/friends/acceptedFriends/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        console.log("Users:", response.data);
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
            onPress={() => navigation.navigate("ChatUser", { user: item })}
            style={styles.messageContainer}
          >
            <Image
              source={
                item.profile?.profileImage || " "
                  ? { uri: item.profile?.profileImage || " " }
                  : Man1
              }
              style={styles.imageStyle}
            />

            <View style={styles.messageBubble}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>
                  {`${item.profile?.firstName} ${item.profile?.lastName}`}
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
