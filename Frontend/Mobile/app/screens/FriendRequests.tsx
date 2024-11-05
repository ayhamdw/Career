import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FriendRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const FriendRequests = ({ user }) => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  const acceptFriendRequest = async (senderId: string, receiverId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const ids = JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
      });
      console.log("After Accept Friend Request");
      const response = await axios.post(
        `http://192.168.1.21:7777/api/user/acceptFriendRequest`,
        { ids },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== senderId)
        );
      }
    } catch (error) {
      console.log("Error inside Accept Friend Request", error);
    }
  };

  const getFriendRequests = async () => {
    try {
      const id = user._id;
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.1.21:7777/api/user/getFriendsRequest/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFriendRequests(response.data);
    } catch (error) {
      console.log("Error inside Get Friends Request", error);
    }
  };

  useEffect(() => {
    getFriendRequests();
  }, []);

  const renderFriendRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <StatusBar barStyle="dark-content" />
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.emailText}>{item.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => acceptFriendRequest(item._id, user._id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        renderItem={renderFriendRequest}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  emailText: {
    fontSize: 14,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "#58d68d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 5,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default FriendRequests;
