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

const Request = ({ user }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/requestDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRequests(response.data);
          console.log("Requests fetched successfully.");
        }
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [user]);

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
            <Text style={styles.location}>{`Location: ${item.location}`}</Text>
            <Text style={styles.date}>{`Date: ${item.date}`}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => console.log("View details pressed")}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
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
    marginBottom: 16,
    color: "#333333",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#58d68d",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  profCareer: {
    fontSize: 16,
    color: "#555555",
    marginVertical: 4,
  },
  location: {
    fontSize: 14,
    color: "#777777",
  },
  date: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 8,
  },
  detailsButton: {
    backgroundColor: "#58d68d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Request;
