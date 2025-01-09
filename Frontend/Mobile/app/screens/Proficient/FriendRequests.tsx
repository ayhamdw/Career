import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ayhamWifiUrl } from "@/constants/Urls";
import styles from "@/assets/styles/ProficientPage/ProfRequestDetails";
import { useNavigation } from "expo-router";

export default function FriendRequests({ user }: { user: any }) {
  const id = user._id;
  const [senderUserData, setSenderUserData] = useState([]);
  const [filter, setFilter] = useState("active");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: -10,
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: "white",
            }}
          />
        </View>
      ),
    });
  }, []);

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const actualDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${actualDate} at ${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  };

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/proficient/sender-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSenderUserData(response.data.senderDetails);
        console.log("Sender user data:", response.data.senderDetails);
      }
    } catch (error) {
      console.error("Error fetching sender user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const requestAction = async (
    action: string,
    bookId: string,
    clientId: string,
    postId: string
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/proficient/request-action`,
        { action, bookId, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchUserData();
      }
    } catch (error) {
      console.error("Error processing request:", error);
    }

    const actionsMap = {
      Accepted: async () => {
        console.log("Handling Accepted action");
        await sendNotification(
          "🎉 Request Accepted! 🎉",
          `Your request has been accepted! We're excited to start working on it. 💪`,
          clientId
        );
      },
      Cancelled: async () => {
        console.log("Handling Cancelled action");
        await sendNotification(
          "🚫 Request Cancelled 🚫",
          `The request has been cancelled. Let us know if you'd like to try again or need assistance. 😊`,
          clientId
        );
      },
      Rejected: async () => {
        console.log("Handling Reject action");
        await sendNotification(
          "❌ Request Rejected ❌",
          `Unfortunately, your request was rejected. Don't worry, there are always more opportunities ahead! 💡`,
          clientId
        );
      },
      Completed: async () => {
        console.log("Handling Completed action");
        await sendNotification(
          "🏆 Request Completed! 🏆",
          `Your request has been successfully completed! 🎉 We hope you are satisfied with the result. 💯`,
          clientId
        );
      },
    };
    if (actionsMap[action]) {
      await actionsMap[action]();
    } else {
      console.error("Unknown action:", action);
    }
  };

  const sendNotification = async (
    title: string,
    message: string,
    clientId: string
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/notification/add-notification`,
        {
          proficientId: clientId,
          userId: id,
          title: title,
          message: message,
          status: "Unread",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("Notification sent successfully");
      }
    } catch (error) {
      console.log("Error submitting request:", error);
      Alert.alert("Error", "Failed to submit the request.");
    }
  };

  const filterData = () => {
    if (filter === "active") {
      return senderUserData.filter(
        (item: any) =>
          item.status === "Pending" ||
          item.status === "Accepted" ||
          item.status === "In Progress"
      );
    }
    return senderUserData.filter(
      (item: any) => item.status === "Cancelled" || item.status === "Completed"
    );
  };

  const renderRequest = ({ item }: { item: any }) => {
    const { sender, status, bookId, dataRequested, city, postId } = item;
    const isProjectRequest = postId !== null;

    return (
      <View style={[styles.card, styles.shadow]}>
        <View style={styles.header}>
          <Image
            source={{ uri: sender.profile.profileImage }}
            style={styles.profileImage}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {sender.profile.firstName} {sender.profile.lastName}
              </Text>
              <View
                style={[
                  styles.badge,
                  isProjectRequest
                    ? styles.projectBadge
                    : styles.proficientBadge,
                ]}
              >
                <Text style={styles.badgeText}>
                  {isProjectRequest ? "Project Request" : "Proficient Request"}
                </Text>
              </View>
            </View>
            <Text style={styles.profession}>{sender.career}</Text>
          </View>
        </View>
        <Text style={styles.email}>{sender.email}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.location}>{city}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color="#888" />
          <Text style={styles.time}>{formatTime(dataRequested)}</Text>
        </View>
        {isProjectRequest && (
          <Text style={styles.projectInfo}>Post ID: {postId}</Text>
        )}
        <View style={styles.actions}>
          {status === "Pending" && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() =>
                  requestAction("Accepted", bookId, sender._id, postId)
                }
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() =>
                  requestAction("Rejected", bookId, sender._id, postId)
                }
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </>
          )}
          {(status === "In Progress" || status === "Accepted") && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() =>
                  requestAction("Cancelled", bookId, sender._id, postId)
                }
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.completeButton]}
                onPress={() =>
                  requestAction("Completed", bookId, sender._id, postId)
                }
              >
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
              {!postId && (
                <TouchableOpacity
                  style={[styles.button, styles.mapButton]}
                  onPress={() => navigation.navigate("MapTracker", { item })}
                >
                  <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Requests</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            filter === "active" && styles.radioButtonActive,
          ]}
          onPress={() => setFilter("active")}
        >
          <Text
            style={[
              styles.radioText,
              filter === "active" && styles.radioTextActive,
            ]}
          >
            Active Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            filter === "completed" && styles.radioButtonActive,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.radioText,
              filter === "completed" && styles.radioTextActive,
            ]}
          >
            Old Requests
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterData()}
        keyExtractor={(item) => item.bookId}
        renderItem={renderRequest}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Add updated styles for badges and shadows in the CSS file
