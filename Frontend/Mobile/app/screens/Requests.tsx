import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "@/assets/styles/RequestStyle";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  email: string;
}

interface FriendRequestPageProps {
  user: User;
}

const Request: React.FC<FriendRequestPageProps> = ({ user }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestSend, setRequestSend] = useState(false);

  const sendFriendsRequest = async (
    currentUserId: string,
    selectedUserId: string
  ) => {
    const ids = JSON.stringify({ currentUserId, selectedUserId });
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.1.21:7777/api/user/send-friend-request",
        { ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestSend(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

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
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user._id]);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#58d68d" />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#58d68d" barStyle="light-content" />
      <Animatable.Text animation="fadeInDown" delay={300} style={styles.title}>
        Connect with Friends
      </Animatable.Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {users.map((item) => (
          <Animatable.View
            key={item._id}
            animation="fadeInUp"
            delay={200}
            style={styles.userContainer}
          >
            <Image
              source={
                item.profileImage
                  ? { uri: item.profileImage }
                  : require("../../assets/images/defaultProfile.png")
              }
              style={styles.imageStyle}
            />
            <View style={styles.userInfo}>
              <Text
                style={styles.userName}
              >{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <TouchableOpacity
              style={
                requestSend ? styles.sendRequestStatus : styles.requestButton
              }
              onPress={() => sendFriendsRequest(user._id, item._id)}
            >
              <AntDesign name="adduser" size={20} color="white" />
              <Text style={styles.buttonText}>
                {requestSend ? "Pending" : "Request"}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Request;
