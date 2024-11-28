// import {
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   Animated,
// } from "react-native";
// import React, { useState, useRef } from "react";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { COLORS } from "@/assets/styles/Dimensions";
// import styles from "../../assets/styles/HomePageStyle";

// const HomePage = ({ user }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("Your Location");
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const sidebarAnimation = useRef(new Animated.Value(300)).current;
//   const cities = ["Qalqila", "Nablus", "Tulkarm", "Jerusalem", "Jenin"];
//   const categories = [
//     {
//       id: 1,
//       title: "Doctor",
//       image: require("../../assets/images/HomePage/DoctorIcon.png"),
//     },
//     {
//       id: 2,
//       title: "Engineer",
//       image: require("../../assets/images/HomePage/EngIcon.png"),
//     },
//     {
//       id: 3,
//       title: "Lawyer",
//       image: require("../../assets/images/HomePage/LawyerIcon.png"),
//     },
//     {
//       id: 4,
//       title: "Artist",
//       image: require("../../assets/images/HomePage/ArtistIcon.png"),
//     },
//   ];

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setModalVisible(false);
//   };
//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);

//     Animated.timing(sidebarAnimation, {
//       toValue: sidebarVisible ? 300 : 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.infoNav}>
//         <TouchableOpacity>
//           <Icon name="search" size={30} color={COLORS.introductionColor} />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setModalVisible(true)}
//           style={styles.locationContainer}
//         >
//           <Text style={styles.locationText}>{selectedCity}</Text>
//           <Icon
//             name="keyboard-arrow-down"
//             size={24}
//             color={COLORS.introductionColor}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={toggleSidebar}>
//           <Icon name="menu" size={30} color={COLORS.introductionColor} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.heroSection}>
//         <Image
//           source={require("../../assets/images/HomePage/heroImage.png")}
//           style={styles.heroImage}
//         />
//       </View>

//       <View style={styles.categoriesSection}>
//         <Text style={styles.categoriesTitle}>Industrial Department</Text>
//         <FlatList
//           data={categories}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled={true}
//           style={styles.flatList}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.categoryCard}>
//               <Image source={item.image} style={styles.categoryImage} />
//               <Text style={styles.categoryTitle}>{item.title}</Text>
//             </TouchableOpacity>
//           )}
//           contentContainerStyle={styles.flatListContent}
//         />
//       </View>

//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select a City</Text>
//             <FlatList
//               data={cities}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => handleCitySelect(item)}>
//                   <Text style={styles.cityItem}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View>
//       </Modal>

//       <Animated.View
//         style={[
//           sidebarVisible ? styles.sidebarContainer1 : styles.sidebarContainer,
//           { transform: [{ translateX: sidebarAnimation }] },
//         ]}
//       >
//         <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>

//         <View style={styles.sidebarContent}>
//           <Text style={styles.sidebarTitle}>Career's Menu</Text>

//           <TouchableOpacity style={styles.sidebarItem}>
//             <Text style={styles.sidebarItemText}>Home</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sidebarItem}>
//             <Text style={styles.sidebarItemText}>Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sidebarItem}>
//             <Text style={styles.sidebarItemText}>Settings</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sidebarItem}>
//             <Text style={styles.sidebarItemText}>Help</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>

//       <View style={styles.ReservationDepartment}>
//         <Text style={styles.categoriesTitle}>Reservation Department</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default HomePage;
import Header from "@/components/HomePage/Header";
import SearchBar from "@/components/HomePage/SearchBar";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const HomePage = () => {
  const [search, setSearch] = React.useState<string>("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header name="Ayham Omar" />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search for jobs"
        value={search}
        onChangeText={setSearch}
      />

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Image
          style={styles.tipImage}
          source={{ uri: "https://via.placeholder.com/100x50" }}
        />
        <View>
          <Text style={styles.tipText}>How to find a perfect job for you</Text>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipButtonText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Recommendation Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {["All Job", "Writer", "Design", "Finance"].map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterChip}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Job Listings */}
      <ScrollView style={styles.jobList}>
        {[
          { title: "UI/UX Designer", company: "Adobe", salary: "$3,200" },
          { title: "Financial Planner", company: "Twitter", salary: "$3,400" },
        ].map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <View>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
            </View>
            <Text style={styles.jobSalary}>{job.salary}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  tipsSection: {
    flexDirection: "row",
    backgroundColor: "#eaf4fc",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  tipImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  tipText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tipButton: {
    marginTop: 10,
    backgroundColor: "#58d68d",
    padding: 10,
    borderRadius: 5,
  },
  tipButtonText: {
    color: "#fff",
  },
  filters: {
    marginTop: 20,
  },
  filterChip: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: "#000",
  },
  jobList: {
    marginTop: 20,
  },
  jobCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobCompany: {
    color: "#888",
  },
  jobSalary: {
    fontSize: 16,
    color: "#58d68d",
  },
});

export default HomePage;
