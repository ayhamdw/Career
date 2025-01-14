import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import cities from "@/constants/Cities";
import styles from "@/assets/styles/JobListStyle";
import SearchModal from "./Modal";
import jobAndProficientList from "@/constants/Jobs";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JobList() {
  const route = useRoute();
  const { job, user } = route.params;
  const [searchJob, setSearchJob] = useState(job);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [dayRate, setDayRate] = useState({ min: "", max: "" });
  const [rating, setRating] = useState("");
  const [toggleButton, setToggleButton] = useState(true);
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [search, setSearch] = useState("");
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

  const [proficient, setProficient] = useState([
    { id: "1", title: "Carpenter", location: "Gaza", price: "$100/day" },
    { id: "2", title: "Plumber", location: "Ramallah", price: "$150/day" },
    { id: "3", title: "Blacksmith", location: "Nablus", price: "$80/day" },
  ]);

  const handleSearch = (data: string) => {
    setSearch(data);
    if (data === "") {
      setSearchResults([]);
    } else {
      const result = jobAndProficientList.filter((job) =>
        job.toLowerCase().includes(data.toLowerCase())
      );
      setSearchResults(result);
    }
  };

  const chooseJob = (item: string) => {
    setSearchModalVisible(false);
    setSearch("");
    setSearchJob(item);
  };

  const toggleFilter = (value, type) => {
    if (type === "city") {
      setSelectedCities((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const applyFilters = async () => {
    const data = {
      title: searchJob,
      cities: selectedCities,
      dayRate: dayRate,
      rating: rating,
    };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/jobs/specific-data/${JSON.stringify(data)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setJobs(response.data.posts);
        setProficient(response.data.proficient);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }

    setModalVisible(false);
  };

  const fetchAllPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/jobs/all-posts/${searchJob}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setJobs(response.data.posts);
        setProficient(response.data.proficient);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

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
          {"$" + item.price + "/day"}
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
          onPress={() => setToggleButton(true)}
        >
          <Text style={styles.toggleButtonText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            toggleButton
              ? styles.toggleButtonInactive
              : styles.toggleButtonActive
          }
          onPress={() => setToggleButton(false)}
        >
          <Text style={styles.toggleButtonText}>Proficient</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => setSearchModalVisible(true)}
        >
          <Text style={styles.placeholderText}>{searchJob}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {jobs.length === 0 && toggleButton === true && (
        <View style={styles.noPostAvailable}>
          <Text style={styles.noPostAvailableText}>No Post Available</Text>
        </View>
      )}

      {proficient.length === 0 && toggleButton === false && (
        <View style={styles.noPostAvailable}>
          <Text style={styles.noPostAvailableText}>
            No Proficient Available
          </Text>
        </View>
      )}
      <FlatList
        data={toggleButton ? jobs : proficient}
        keyExtractor={(item) => item._id}
        renderItem={renderJob}
        contentContainerStyle={styles.jobList}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            <ScrollView>
              <Text style={styles.filterCategory}>Cities</Text>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.cityOption,
                    selectedCities.includes(city) && styles.selectedOption,
                  ]}
                  onPress={() => toggleFilter(city, "city")}
                >
                  <Text
                    style={[
                      styles.cityOptionText,
                      selectedCities.includes(city) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
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

              <Text style={styles.filterCategory}>Rating (1 - 5)</Text>
              <View style={styles.dayRateRow}>
                <TextInput
                  style={styles.dayRateInput}
                  placeholder="Rating"
                  keyboardType="numeric"
                  value={rating}
                  onChangeText={(text) => setRating(text)}
                />
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.applyButton]}
                onPress={() => applyFilters()}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <SearchModal
        modalVisible={searchModalVisible}
        setModalVisible={setSearchModalVisible}
        search={search}
        setSearch={handleSearch}
        searchResults={searchResults}
        chooseJob={chooseJob}
      />
    </View>
  );
}
