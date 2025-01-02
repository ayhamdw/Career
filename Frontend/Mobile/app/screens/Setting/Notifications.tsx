import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
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

  const updateNotification = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${ayhamWifiUrl}/api/notification/update-notification/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const submitRating = async () => {
    if (
      !rating ||
      isNaN(rating) ||
      rating < 1 ||
      rating > 5 ||
      comment === ""
    ) {
      alert("Please enter a valid rating (1-5) and comment");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/notification/rate-proficient/${currentNotificationId}`,
        { rating: parseFloat(rating), comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Rating Submitted Successfully! 🎉",
          position: "top",
          visibilityTime: 4000,
        });
        setRatingModalVisible(false);
        setRating("");
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderNotification = ({ item }) => {
    const {
      id,
      title,
      message,
      firstName,
      lastName,
      profileImage,
      status,
      date,
    } = item;

    return (
      <View>
        <TouchableOpacity
          style={styles.notificationCard}
          onPress={() => updateNotification(id)}
          disabled={status === "Read"}
        >
          <View style={styles.row}>
            <Image
              source={{
                uri: profileImage || "https://www.gravatar.com/avatar/0?d=mp",
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <Text style={styles.details}>
                From: {firstName} {lastName}
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
          {title.includes("Completed!") && (
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => {
                setCurrentNotificationId(id);
                setRatingModalVisible(true);
              }}
            >
              <Text style={styles.rateButtonText}>Rate</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

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

      <Modal
        visible={ratingModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Proficient</Text>
            <TextInput
              style={styles.input}
              value={rating}
              onChangeText={setRating}
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
            />

            <Text style={styles.modalTitle}>Your Comment</Text>
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={setComment}
              placeholder="Write Your Comment"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setRatingModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={submitRating}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  rateButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#6c63ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  rateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#6c63ff",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Notifications;
