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
export default function FriendRequests({ user }: { user: any }) {
  const id = user._id;
  const [senderUserData, setSenderUserData] = useState([]);
  const [filter, setFilter] = useState("active"); // 'active' or 'completed'

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
                onPress={() => requestAction("Accept", bookId)}
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
                onPress={() => console.log("Show Map")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    gap: 20,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelledStatus: {
    backgroundColor: "#ff6b6b",
  },
  completedStatus: {
    backgroundColor: "#3498db",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  radioButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginHorizontal: 4,
  },
  radioButtonActive: {
    backgroundColor: "#58d68d",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  radioTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profession: {
    fontSize: 14,
    color: "#58d68d",
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  location: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
  time: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    width: "100%",
  },
  acceptButton: {
    backgroundColor: "#58d68d",
  },
  rejectButton: {
    backgroundColor: "#ff6b6b",
  },
  cancelButton: {
    backgroundColor: "#f39c12",
  },
  completeButton: {
    backgroundColor: "#3498db",
  },
  mapButton: {
    backgroundColor: "#985174",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
