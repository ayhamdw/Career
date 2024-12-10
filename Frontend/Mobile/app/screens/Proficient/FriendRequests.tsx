import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ayhamWifiUrl } from "@/constants/Urls";
import styles from "@/assets/styles/ProficientPage/ProfRequestDetails";
import { useNavigation } from "expo-router";
export default function FriendRequests({ user }: { user: any }) {
  const id = user._id;
  console.log(id);
  const [senderUserData, setSenderUserData] = useState([]);
  const [filter, setFilter] = useState("active");
  const navigation = useNavigation();

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
      }
    } catch (error) {
      console.error("Error fetching sender user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const requestAction = async (action: string, bookId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/proficient/request-action`,
        { action, bookId },
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
    const { sender, status, bookId, dataRequested, city } = item;
    return (
      <View style={styles.card}>
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
                  styles.statusBadge,
                  status === "Cancelled"
                    ? styles.cancelledStatus
                    : styles.completedStatus,
                ]}
              >
                <Text style={styles.statusText}>{status}</Text>
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
        <View style={styles.actions}>
          {status === "Pending" && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => requestAction("Accepted", bookId)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => requestAction("Rejected", bookId)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </>
          )}
          {(status === "In Progress" || status === "Accepted") && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => requestAction("Cancelled", bookId)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.completeButton]}
                onPress={() => requestAction("Completed", bookId)}
              >
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.mapButton]}
                onPress={() => navigation.navigate("MapTracker", { item })}
              >
                <Text style={styles.buttonText}>Map</Text>
              </TouchableOpacity>
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
