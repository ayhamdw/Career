import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

export default function JobList() {
  const route = useRoute();
  const { job, user } = route.params;
  const [searchText, setSearchText] = useState("");
  const [resultSearch, setResultSearch] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dayRate, setDayRate] = useState({ min: "", max: "" });
  const [toggleButton, setToggleButton] = useState(true);
  const [jobs, setJobs] = useState([
    { id: "1", title: "Web Developer", location: "Gaza", price: "$100/day" },
    {
      id: "2",
      title: "Graphic Designer",
      location: "Ramallah",
      price: "$150/day",
    },
    { id: "3", title: "Content Writer", location: "Nablus", price: "$80/day" },
  ]);

  const [proficient, setProficeint] = useState([
    { id: "1", title: "Carpenter", location: "Gaza", price: "$100/day" },
    {
      id: "2",
      title: "Plumber",
      location: "Ramallah",
      price: "$150/day",
    },
    { id: "3", title: "Black Smith", location: "Nablus", price: "$80/day" },
  ]);

  const cities = [
    "Gaza",
    "Ramallah",
    "Nablus",
    "Hebron",
    "Jerusalem",
    "Jenin",
    "Tulkarm",
    "Qalqilya",
    "Bethlehem",
    "Tubas",
    "Salfit",
    "Jericho",
  ];
  const careerCategories = [
    "Technical Services",
    "Home Services",
    "Educational Services",
    "Healthcare",
    "Creative Services",
    "Legal & Financial Services",
    "Other",
  ];

  useEffect(() => {
    setResultSearch(jobs);
  }, []);
  const toggleModal = () => setModalVisible(!isModalVisible);

  const toggleFilter = (value, type) => {
    if (type === "city") {
      setSelectedCities((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const changeText = (text: string) => {
    setSearchText(text);
    setResultSearch(
      jobs.filter((job) => job.title.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const renderJob = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => console.log("Navigate to job details:", item)}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="briefcase-outline" size={24} color="#4CAF50" />
        <Text style={styles.jobTitle}>{item.title}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.jobLocation}>
          <Ionicons name="location-outline" size={18} color="#777" />{" "}
          {item.location}
        </Text>
        <Text style={styles.jobPrice}>
          <Ionicons name="pricetag-outline" size={18} color="#28a745" />{" "}
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleButtonContainer}>
        <TouchableOpacity
          style={
            toggleButton
              ? styles.toggleButtonActive
              : styles.toggleButtonInactive
          }
          onPress={() => setToggleButton(!toggleButton)}
        >
          <Text style={styles.toggleButtonText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            toggleButton
              ? styles.toggleButtonInactive
              : styles.toggleButtonActive
          }
          onPress={() => setToggleButton(!toggleButton)}
        >
          <Text style={styles.toggleButtonText}>Proficient</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs"
          value={searchText}
          onChangeText={changeText}
          autoFocus={true}
        />
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={resultSearch}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        contentContainerStyle={styles.jobList}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            <ScrollView>
              <Text style={styles.filterCategory}>Cities</Text>
              {cities.map((city) => (
                <View key={city} style={styles.filterRow}>
                  <Checkbox
                    status={
                      selectedCities.includes(city) ? "checked" : "unchecked"
                    }
                    onPress={() => toggleFilter(city, "city")}
                  />
                  <Text>{city}</Text>
                </View>
              ))}

              <Text style={styles.filterCategory}>Career Categories</Text>
              {careerCategories.map((category) => (
                <View key={category} style={styles.filterRow}>
                  <Checkbox
                    status={
                      selectedCategories.includes(category)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => toggleFilter(category, "category")}
                  />
                  <Text>{category}</Text>
                </View>
              ))}

              <Text style={styles.filterCategory}>Day Rate</Text>
              <View style={styles.dayRateRow}>
                <TextInput
                  style={styles.dayRateInput}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={dayRate.min}
                  onChangeText={(text) => setDayRate({ ...dayRate, min: text })}
                />
                <Text style={styles.dayRateDivider}>to</Text>
                <TextInput
                  style={styles.dayRateInput}
                  placeholder="Max"
                  keyboardType="numeric"
                  value={dayRate.max}
                  onChangeText={(text) => setDayRate({ ...dayRate, max: text })}
                />
              </View>
            </ScrollView>
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="red" onPress={toggleModal} />
              <Button title="Apply" onPress={toggleModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  jobList: {
    paddingBottom: 20,
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobLocation: {
    color: "#555",
  },
  jobPrice: {
    color: "#28a745",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "80%",
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayRateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayRateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
  dayRateDivider: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  toggleButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleButtonActive: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#007bff",
    width: "48%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonInactive: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    width: "48%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
