import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";

interface Request {
  city: string;
  dateRequested: string;
  provider?: {
    _id: string;
    career: string;
    profile: {
      firstName: string;
      lastName: string;
    };
    status: string;
  };
  project?: {
    title: string;
    description: string;
    clientName: string;
    status: string;
  };
}

const RequestScreen = ({ user }: { user: any }) => {
  const [selectedTab, setSelectedTab] = useState<"proficient" | "project">(
    "proficient"
  );
  const [proficientRequests, setProficientRequests] = useState<Request[]>([]);
  const [projectRequests, setProjectRequests] = useState<Request[]>([]);
  const id = user._id;

  const fetchRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const proficientResponse = await axios.get(
        `${ayhamWifiUrl}/api/proficient/requestDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (proficientResponse.status === 200) {
        setProficientRequests(proficientResponse.data.proficientInfo);
      }
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user._id]);

  const renderProficientRequest = (item: Request) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.profName}>
          {item.provider?.profile.firstName +
            " " +
            item.provider?.profile.lastName}
        </Text>
        <View
          style={{
            ...styles.statusBadge,
            backgroundColor:
              item.provider?.status === "Pending"
                ? "#ffc107"
                : item.provider?.status === "Accepted"
                ? "#28a745"
                : item.provider?.status === "In Progress"
                ? "#007bff"
                : "#dc3545",
          }}
        >
          <Text style={styles.statusText}>{item.provider?.status}</Text>
        </View>
      </View>
      <Text style={styles.profCareer}>🎓 {item.provider?.career}</Text>
      <Text style={styles.info}>📍 {item.city}</Text>
      <Text style={styles.info}>
        📅 {new Date(item.dateRequested).toLocaleDateString()}
      </Text>
    </View>
  );

  const renderProjectRequest = (item: Request) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.profName}>{item.project?.title}</Text>
        <View
          style={{
            ...styles.statusBadge,
            backgroundColor:
              item.project?.status === "Pending"
                ? "#ffc107"
                : item.project?.status === "Approved"
                ? "#28a745"
                : item.project?.status === "In Progress"
                ? "#007bff"
                : "#dc3545",
          }}
        >
          <Text style={styles.statusText}>{item.project?.status}</Text>
        </View>
      </View>
      <Text style={styles.info}>👤 {item.project?.clientName}</Text>
      <Text style={styles.info}>📝 {item.project?.description}</Text>
      <Text style={styles.info}>
        📅 {new Date(item.dateRequested).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}></View>

      <FlatList
        data={
          selectedTab === "proficient" ? proficientRequests : projectRequests
        }
        keyExtractor={(item, index) =>
          selectedTab === "proficient"
            ? item.provider?._id || index.toString()
            : item.project?.title || index.toString()
        }
        renderItem={({ item }) =>
          selectedTab === "proficient"
            ? renderProficientRequest(item)
            : renderProjectRequest(item)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
  },
  tab: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    paddingVertical: 8,
  },
  activeTab: {
    color: "#58d68d",
    borderBottomWidth: 2,
    borderBottomColor: "#58d68d",
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
  info: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
  },
});

export default RequestScreen;
