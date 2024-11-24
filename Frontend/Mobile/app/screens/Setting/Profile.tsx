import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import styles from "@/assets/styles/ProfileStyle";
const Profile = ({ user }) => {
  const navigation = useNavigation();
  console.log(user);
  const logoutFunction = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        `${ayhamWifiUrl}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        console.log("Logout successful");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#58d68d", "#28a745"]}
        style={{
          height: 200,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Profile Setting
          </Text>
        </View>
      </LinearGradient>

      <View style={{ alignItems: "center", marginTop: -80 }}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 5,
            borderColor: "white",
          }}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
          {user.profile.firstName}
        </Text>
        <Text style={{ fontSize: 16, color: "#7d7d7d", marginBottom: 20 }}>
          {user.careerCategory + "," + user.career}
        </Text>
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: "#f9f9f9",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: 10,
          elevation: 5,
          shadowColor: "#000",
        }}
      >
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ProfileInfo")}
        >
          <Ionicons name="person-outline" style={styles.iconStyle} />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ViewResume")}
        >
          <Ionicons name="document-text-outline" style={styles.iconStyle} />
          <Text style={styles.optionText}>View Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" style={styles.iconStyle} />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Ionicons name="lock-closed-outline" style={styles.iconStyle} />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={logoutFunction}>
          <Ionicons name="log-out-outline" style={styles.iconStyle} />
          <Text style={[styles.optionText, { color: "#e74c3c" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
