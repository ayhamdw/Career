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
import { COLORS } from "@/assets/styles/Dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = ({ user }) => {
  // console.log(user.firstName, user.lastName);
  const navigation = useNavigation();
  const logoutFunction = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        "http://192.168.1.21:7777/user/logout",
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.introductionColor,
    height: 250,
    marginBottom: -100,
    marginTop: -100,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  profileCenter: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "90%",
    elevation: 5,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textColor,
  },
  jobTitle: {
    fontSize: 16,
    color: COLORS.jobTitleTextColor,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  stats: {
    alignItems: "center",
    flex: 1,
  },
  statsCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsLabel: {
    color: COLORS.forgetPasswordLabelColor,
  },
  optionCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    marginTop: 265,
    paddingHorizontal: 20,
    width: "90%",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.textColor,
  },
  iconStyle: {
    fontSize: 24,
    color: "black",
  },
});

export default Profile;
