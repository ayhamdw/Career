import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, SIZE } from "@/assets/styles/Dimensions";
import styles from "../../assets/styles/HomePageStyle";

const HomePage = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Your Location");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(300)).current; // Start off-screen
  // const [sideBarWidth,setSideBarWidth] = useState(0);
  const cities = ["Qalqila", "Nablus", "Tulkarm", "Jerusalem", "Jenin"];
  const categories = [
    {
      id: 1,
      title: "Doctor",
      image: require("../../assets/images/HomePage/DoctorIcon.png"),
    },
    {
      id: 2,
      title: "Engineer",
      image: require("../../assets/images/HomePage/EngIcon.png"),
    },
    {
      id: 3,
      title: "Lawyer",
      image: require("../../assets/images/HomePage/LawyerIcon.png"),
    },
    {
      id: 4,
      title: "Artist",
      image: require("../../assets/images/HomePage/ArtistIcon.png"),
    },
    // Add more categories as needed
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalVisible(false);
  };
  const [sideBarStyle, setSideBarStyle] = useState({});

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);

    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? 300 : 0, // Move to 300 when opening, 0 when closing
      duration: 300, // Duration of the animation
      useNativeDriver: false, // Use native driver for better performance
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoNav}>
        <TouchableOpacity>
          <Icon name="search" size={30} color={COLORS.introductionColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.locationContainer}
        >
          <Text style={styles.locationText}>{selectedCity}</Text>
          <Icon
            name="keyboard-arrow-down"
            size={24}
            color={COLORS.introductionColor}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={30} color={COLORS.introductionColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.heroSection}>
        <Image
          source={require("../../assets/images/HomePage/heroImage.png")}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Industrial Department</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          style={styles.flatList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      {/* Modal for city selection */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a City</Text>
            <FlatList
              data={cities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCitySelect(item)}>
                  <Text style={styles.cityItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Animated.View
        style={[
          sidebarVisible ? styles.sidebarContainer1 : styles.sidebarContainer,
          { transform: [{ translateX: sidebarAnimation }] },
        ]}
      >
        <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>

        <View style={styles.sidebarContent}>
          <Text style={styles.sidebarTitle}>Career's Menu</Text>

          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Help</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>


      <View style={styles.ReservationDepartment}>
        <Text style={styles.categoriesTitle}>Reservation Department</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
