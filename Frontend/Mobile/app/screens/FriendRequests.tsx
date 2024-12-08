import React, { useEffect } from "react";
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

  const [senderUserData, setSenderUserData] = React.useState([]);

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const actualDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${actualDate} on ${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token:", token);
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
          console.log("Sender User Data:", response.data);
        }
      } catch (error) {
        console.log("Error fetching sender user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleAccept = (requestId: string) => {
    console.log(`Accepted request with ID: ${requestId}`);
    // Add accept logic here
  };

  const handleReject = (requestId: string) => {
    console.log(`Rejected request with ID: ${requestId}`);
    // Add reject logic here
  };

  const renderRequest = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: item.sender.profile.profileImage }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>
            {item.sender.profile.firstName + " " + item.sender.profile.lastName}
          </Text>
          <Text style={styles.profession}>{item.sender.career}</Text>
        </View>
      </View>
      <Text style={styles.email}>{item.sender.email}</Text>
      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#888" />
        <Text style={styles.location}>{item.sender.city}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="time-outline" size={16} color="#888" />
        <Text style={styles.time}>{formatTime(item.dataRequested)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item.sender._id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item.sender._id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Requests</Text>
      <FlatList
        data={senderUserData}
        keyExtractor={(item) => item.sender._id}
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
  },
  acceptButton: {
    backgroundColor: "#58d68d",
  },
  rejectButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
