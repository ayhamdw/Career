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
        <Text style={styles.categoriesTitle}>Categories</Text>
        <FlatList
          // ref={flatListRef}
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
          // contentContainerStyle={{ paddingHorizontal: 10 }}
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
  },
  infoNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
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
    marginTop: 30,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoriesSection: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    overflow: "hidden",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
  },
  

  categoriesTitle: {
    fontSize: SIZE.h2,
    fontWeight: "bold",
    color: COLORS.textColor,
    marginBottom: 10,
  },
  flatList:{
    display:"flex",
    width:400,
    overflow:"scroll",
    // backgroundColor:"red"
  },
  categoryCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    // elevation: 2,
    marginHorizontal: 10,
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
});
