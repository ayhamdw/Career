import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import styles from "../../assets/styles/ProfileStyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = ({ user }) => {
  // console.log(user.firstName, user.lastName);
  const navigation = useNavigation();
  const logoutFunction = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        "http://192.168.1.21:7777/api/user/logout",
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
        console.log("Test successful");
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={[styles.container]}>
        <StatusBar barStyle="dark-content" backgroundColor="#CEEB43" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCenter}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user.firstName}</Text>
            <Text style={styles.jobTitle}>UI/UX Designer</Text>

            <View style={styles.statsContainer}>
              <View style={styles.stats}>
                <Text style={styles.statsCount}>25</Text>
                <Text style={styles.statsLabel}>Applied</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.statsCount}>10</Text>
                <Text style={styles.statsLabel}>Interview</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.statsCount}>16</Text>
                <Text style={styles.statsLabel}>Bookmark</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.optionCenter}>
          <View style={styles.optionsContainer}>
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
              <Text style={styles.optionText}>Notification</Text>
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
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
