import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile_Info from "./Profile_Info";

const ProfileScreen = ({ navigation }) => {
  return (
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
          <Text style={styles.name}>Alexa Demain</Text>
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
            onPress={() => navigation.navigate("Profile_Info")}
          >
            <Ionicons name="person-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="briefcase-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Applied Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="bookmark-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Bookmark Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="document-text-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>View Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="log-out-outline" style={styles.iconStyle} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const myStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile_Information" component={Profile_Info} />
      </Stack.Navigator>
    </NavigationContainer>
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
    backgroundColor: "#CEEB43",
    height: 250, // Adjust height as needed
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
    top: 50, // Adjust based on header height
    left: 0,
    right: 0,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
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
    color: "#333",
  },
  jobTitle: {
    fontSize: 16,
    color: "#999",
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
    color: "#666",
  },
  optionCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    marginTop: 280, // Adjust as needed to avoid overlap
    paddingHorizontal: 20,
    width: "90%",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000", // For iOS shadow
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
    color: "#333",
  },
  iconStyle: {
    fontSize: 24,
    color: "black",
    // marginLeft: 10/,
  },
});

export default ProfileScreen;
