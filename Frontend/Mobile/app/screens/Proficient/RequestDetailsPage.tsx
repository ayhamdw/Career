import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";

export default function RequestDetailsPage({ route, navigation }) {
  const { proficientId } = route.params;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [region, setRegion] = useState({
    latitude: 31.5,
    longitude: 35.1,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [markerLocation, setMarkerLocation] = useState(region);
  const GOOGLE_API = process.env.EXPO_PUBLIC_GOOGLE_APIS_KEY;
  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select a date and time.");
      return;
    }

    // try {
    //   const token = await AsyncStorage.getItem("token");
    const requestDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    ).toISOString();

    //   const response = await axios.post(
    //     `${ayhamWifiUrl}/api/proficient/booking-proficient`,
    //     {
    //       proficientId,
    //       requestDateTime,
    //       location: {
    //         latitude: markerLocation.latitude,
    //         longitude: markerLocation.longitude,
    //       },
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     Alert.alert("Success", "Request submitted successfully!");
    //     navigation.goBack();
    //   }
    // } catch (error) {
    //   console.log("Error submitting request:", error);
    //   Alert.alert("Error", "Failed to submit the request.");
    // }
    console.log(markerLocation.latitude, markerLocation.longitude);
    console.log(requestDateTime);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <Text style={styles.title}>Select Request Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick a Location</Text>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
          >
            <Marker
              tappable
              coordinate={markerLocation}
              onDragEnd={(e) => setMarkerLocation(e.nativeEvent.coordinate)}
            />
          </MapView>
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                setRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
                setMarkerLocation({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
              }
            }}
            query={{
              key: GOOGLE_API,
              language: "en",
            }}
            fetchDetails={true}
            styles={{
              textInput: {
                height: 45,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                fontSize: 16,
                backgroundColor: "#fff",
              },
              listView: {
                backgroundColor: "#fff",
                borderRadius: 10,
                marginVertical: 5,
              },
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick a Date</Text>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="spinner"
              onChange={(event, date) => date && setSelectedDate(date)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick a Time</Text>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, time) => time && setSelectedTime(time)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4a4a4a",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  datePicker: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  submitButton: {
    backgroundColor: "#58d68d",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
