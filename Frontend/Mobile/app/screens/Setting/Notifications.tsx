import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import { useNavigation } from "@react-navigation/native";

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();
  const userId = user?._id;
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/requestDetails/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const fetchedNotifications = response.data.proficientInfo.map(
            (item) => ({
              id: item.provider._id,
              name: `${item.provider.profile.firstName} ${item.provider.profile.lastName}`,
              status: item.status,
              details: item,
            })
          );

          setNotifications(fetchedNotifications);
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const navigateToDetails = (notification) => {
    navigation.navigate("NotificationDetails", { notification });
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyText}>No notifications available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationCard}
            onPress={() => navigateToDetails(item)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 16,
  },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 12,
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
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
  emptyText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
  },
});

export default Notifications;
