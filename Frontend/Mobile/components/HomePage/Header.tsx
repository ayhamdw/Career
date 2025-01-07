import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "@/assets/styles/HomePage/HeaderStyle";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

interface HeaderProps {
  name: string;
  navigation: any;
  userId: string;
}

const Header: React.FC<HeaderProps> = ({ name, navigation, userId }) => {
  const [notificationNumber, setNotificationNumber] = useState(0);
  const scaleAnim = new Animated.Value(1);

  const fetchNotificationNumber = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      console.log(userId);
      const response = await axios.get(
        `${ayhamWifiUrl}/api/notification/get-notification/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        const unreadNotifications = response.data.finalResults.filter(
          (notification) => notification.status === "Unread"
        );
        setNotificationNumber(unreadNotifications.length);

        if (unreadNotifications.length > 0) {
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotificationNumber();
    }, [userId])
  );

  return (
    <View style={styles.headerStyle}>
      <Text style={styles.textStyle}>Hello, {name}!</Text>
      <TouchableOpacity
        style={styles.buttonNotificationStyle}
        onPress={() => {
          navigation.navigate("Notifications", { userId });
        }}
      >
        <Ionicons name="notifications" size={28} color="#58d68d" />
        {notificationNumber > 0 && (
          <Animated.View
            style={[styles.badgeStyle, { transform: [{ scale: scaleAnim }] }]}
          >
            <Text style={styles.badgeText}>{notificationNumber}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
