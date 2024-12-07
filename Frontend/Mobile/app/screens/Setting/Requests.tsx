import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";

interface Request {
  city: string;
  dateRequested: string;
  provider: {
    _id: string;
    career: string;
    profile: {
      firstName: string;
      lastName: string;
    };
    status: string;
  };
}

const Request = ({ user }: { user: any }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const id = user._id;

  // Format time to HH:MM AM/PM
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/requestDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRequests(response.data.proficientInfo);
        }
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [user._id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sent Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.provider._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.profName}>
                {item.provider.profile.firstName +
                  " " +
                  item.provider.profile.lastName}
              </Text>
              <View
                style={{
                  ...styles.statusBadge,
                  backgroundColor:
                    item.status === "Pending"
                      ? "#ffc107"
                      : item.status === "Accepted"
                      ? "#28a745"
                      : "#dc3545",
                }}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.profCareer}>🎓 {item.provider.career}</Text>
            <Text style={styles.info}>📍 {item.city}</Text>
            <Text style={styles.info}>
              📅 {new Date(item.dateRequested).toLocaleDateString()}
            </Text>
            <Text style={styles.info}>⏰ {formatTime(item.dateRequested)}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => console.log("View details pressed")}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#58d68d",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  profCareer: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
  },
  detailsButton: {
    marginTop: 12,
    backgroundColor: "#58d68d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

export default Request;
