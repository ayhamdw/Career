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
import groupImage from "../../assets/images/team.png";
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

interface Group {
  _id: string;
  groupName: string;
  members: string[];
  lastMessage?: string;
}

interface MessagesProps {
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<"Direct" | "Groups">("Direct");
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = user._id;

        if (activeTab === "Direct") {
          const response = await axios.get(
            `${ayhamWifiUrl}/api/friends/acceptedFriends/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers([...new Set(response.data)]);
        } else {
          const response = await axios.get(
            `${ayhamWifiUrl}/api/community//getMyPostsWithDetails/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setGroups(response.data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user._id, activeTab]);

  const renderDirectMessages = () =>
    users.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate("ChatUser", { user: item })}
        style={styles.messageContainer}
      >
        <Image
          source={
            item.profile?.profileImage
              ? { uri: item.profile?.profileImage }
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
    ));

  const renderGroups = () =>
    groups.map((group, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate("ChatGroup", { group })}
        style={styles.messageContainer}
      >
        <Image source={groupImage} style={styles.imageStyle} />
        <View style={styles.messageBubble}>
          <View style={styles.messageHeader}>
            <Text style={styles.userName}>{group.groupName}</Text>
          </View>
          <Text style={styles.messageText}>
            {group.lastMessage || "No recent messages"}
          </Text>
        </View>
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.chatTextStyle}>Chat</Text>
      <StatusBar backgroundColor={"red"} />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Direct" && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab("Direct")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeTab === "Direct" && styles.activeToggleButtonText,
            ]}
          >
            Direct Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Groups" && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab("Groups")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeTab === "Groups" && styles.activeToggleButtonText,
            ]}
          >
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === "Direct" ? renderDirectMessages() : renderGroups()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
