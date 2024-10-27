import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";
import { COLORS, SIZE } from "@/assets/styles/Dimensions";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';



const HomePage = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Your Location");

  const cities = ["Qalqila", "Nablus", "Tulkarm", "Jerusalem", "Jenin"];

  const categories = [
    { id: 1, title: "Doctor", image: require("../../assets/images/HomePage/DoctorIcon.png") },
    { id: 2, title: "Engineer", image: require("../../assets/images/HomePage/EngIcon.png") },
    { id: 3, title: "Lawyer", image: require("../../assets/images/HomePage/LawyerIcon.png") },
    { id: 4, title: "Artist", image: require("../../assets/images/HomePage/ArtistIcon.png") },
    { id: 5, title: "Artist", image: require("../../assets/images/HomePage/ArtistIcon.png") },
    { id: 6, title: "Doctor", image: require("../../assets/images/HomePage/DoctorIcon.png") },
    { id: 7, title: "Engineer", image: require("../../assets/images/HomePage/EngIcon.png") },
    { id: 8, title: "Lawyer", image: require("../../assets/images/HomePage/LawyerIcon.png") },
    { id: 9, title: "Artist", image: require("../../assets/images/HomePage/ArtistIcon.png") },
    { id: 10, title: "Artist", image: require("../../assets/images/HomePage/ArtistIcon.png") },
  ];




  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalVisible(false);
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

        <TouchableOpacity>
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
          contentContainerStyle={styles.flatListContent} // Apply custom style here
        />
      </View>

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

      <View style={styles.ReservationDepartment}>
        <Text style={styles.categoriesTitle}>Reservation Department</Text>
      </View>



    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.pageBackgroundColor,
    alignItems: "center",
    flex: 1,
    width:"100%",
    // backgroundColor:"red"
  },
  infoNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
    backgroundColor: COLORS.tabBarBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: COLORS.introductionColor,
    borderWidth: 1,
  },
  locationText: {
    fontSize: SIZE.h3,
    fontWeight: "bold",
    color: COLORS.textColor,
    marginRight: 8,
  },
  heroSection: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 5,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoriesSection: {
    // backgroundColor: "#f0f0f0",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 15,
    marginBottom:15,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor:COLORS.containerColor
    

  },


  categoriesTitle: {
    fontSize: SIZE.h2,
    fontWeight: "bold",
    color: COLORS.grayTextColor,
    marginBottom: 15,
    textAlign: 'center',
    alignSelf:"flex-start",
    paddingLeft:8
    
  },
  flatList: {
    width: "100%",
    paddingBottom:10,
  },
  flatListContent: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    // transition: "transform 0.2s",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.tabBarBackgroundColor,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "50%",
  },
  swiper: {
    height: 200,
    width: "100%",
  },
  modalTitle: {
    fontSize: SIZE.h2,
    fontWeight: "bold",
    color: COLORS.introductionColor,
    marginBottom: 15,
  },
  cityItem: {
    fontSize: SIZE.h3,
    color: COLORS.textColor,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textInputBorderColor,
  },
  ReservationDepartment:{
    // backgroundColor:"red",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom:15,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor:COLORS.containerColor
  }
});
