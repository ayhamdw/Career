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

const Request = ({ user }: { user: any }) => {
  const [requests, setRequests] = useState([]);
  const id = user._id;
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
          console.log("Requests:", response.data.proficientInfo);
        }
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [user._id]);

  const fakeRequests = [
    {
      id: "1",
      profName: "Ayham",
      profCareer: "Electrician",
      location: "Nablus",
      status: "Pending",
      date: "2024-12-02",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sent Requests</Text>
      <FlatList
        data={fakeRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.profName}>{item.profName}</Text>
              <Text
                style={{
                  ...styles.status,
                  color:
                    item.status === "Pending"
                      ? "#ffc107"
                      : item.status === "Accepted"
                      ? "#28a745"
                      : "#dc3545",
                }}
              >
                {item.status}
              </Text>
            </View>
            <Text style={styles.profCareer}>{item.profCareer}</Text>
            <Text style={styles.info}>{`📍 ${item.location}`}</Text>
            <Text style={styles.info}>{`📅 ${item.date}`}</Text>
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
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#58d68d",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  profName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#58d68d",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  profCareer: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 2,
  },
  detailsButton: {
    marginTop: 8,
    backgroundColor: "#58d68d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default Request;
