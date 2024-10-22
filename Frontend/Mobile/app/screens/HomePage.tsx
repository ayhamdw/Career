import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS } from "@/assets/styles/Dimensions";

const HomePage = ({ user }) => {
  console.log(user?.firstName);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoNav}>
        <View style={styles.info}>
          <Text style={styles.username}>Welcome {user.firstName}</Text>
          <Text style={styles.additionalInfo}>
            Your current Location In xxx
          </Text>
        </View>
        <Image
          source={require("../../assets/images/HomePage/userIcon.png")}
          style={styles.userIcon}
        />
      </View>

      <View style={styles.filterSection}>
        <View style={styles.searchSection}>
          <Image
            source={require("../../assets/images/HomePage/searchIcon.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/HomePage/filterSearchIcon.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.catList}>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/DoctorIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Doctor</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/EngIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Engineer</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/LawyerIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Lawyer</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/ArtistIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Artist</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/DoctorIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Doctor</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/EngIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Engineer</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/LawyerIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Lawyer</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
        <View style={styles.cat}>
          <Image
            source={require("../../assets/images/HomePage/ArtistIcon.png")}
            style={styles.catImage}
          ></Image>
          <Text style={styles.catDescription}>Artist</Text>
          <Text style={styles.catItemsCount}>Number Of itemss</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    // marginTop:-100
  },
  infoNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  additionalInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
    marginRight: 10,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: 35,
  },
  filterIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
  },

  catList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    gap: 10,
  },
  cat: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "48%",
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    maxWidth: 200,
  },
  catImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  catDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  catItemsCount: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    backgroundColor: "#f8f8f8",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
