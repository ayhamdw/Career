import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../assets/styles/NotificationsStyles";

const notifications = [
  {
    id: "1",
    title: "Request Completed",
    message: "Your request has been completed successfully.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Request Failed",
    message: "Your request has failed due to insufficient funds.",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "You Have New Request",
    message: "You have a new request from a client.",
    timestamp: "30 minutes ago",
  },
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="notifications-active" size={20} color="white" />
          <Text style={styles.actionText}>Mark All as Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.actionText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.accentLine} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;
