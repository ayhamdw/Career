import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import { useNavigation, useRoute } from "@react-navigation/native";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localStatus, setLocalStatus] = useState("Unread");
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/notification/get-notification/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setNotifications(response.data.finalResults);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const updateNotification = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/notification/update-notification/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Notification updated successfully.");
        fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderNotification = ({ item }: { item: any }) => {
    const {
      id,
      title,
      message,
      firstName,
      lastName,
      profileImage,
      type,
      status,
      date,
    } = item;
    return (
      <TouchableOpacity
        style={styles.notificationCard}
        onPress={() => updateNotification(id)}
      >
        <View style={styles.row}>
          <Image
            source={{
              uri: profileImage
                ? profileImage
                : "https://www.gravatar.com/avatar/0?d=mp",
            }}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.details}>
              From: {firstName} {lastName} | {type}
            </Text>
            <Text style={styles.date}>{formatTime(date)}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusIndicator,
            status === "Unread" ? styles.unread : styles.read,
          ]}
        />
      </TouchableOpacity>
    );
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#ddd",
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  details: {
    fontSize: 12,
    color: "#888",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    top: 16,
    right: 16,
  },
  unread: {
    backgroundColor: "#f00",
  },
  read: {
    backgroundColor: "#0f0",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
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
  list: {
    paddingBottom: 16,
  },
});

export default Notifications;
