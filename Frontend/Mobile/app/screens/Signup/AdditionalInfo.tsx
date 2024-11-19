import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

type AdditionalInfoProps = NativeStackScreenProps<
  SignUpStackParamList,
  "AdditionalInfo"
>;

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  navigation,
  route,
}) => {
  const { firstName, lastName, username, gender, dateOfBirth, email } =
    route.params;
  const [password, setPassword] = useState<string>("");
  const [cityFocus, setCityFocus] = useState<boolean>(false);
  const [careerFocus, setCareerFocus] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [anotherCity, setAnotherCity] = useState<string>("");
  const [anotherCareer, setAnotherCareer] = useState<string>("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.9464,
    longitude: 35.3027,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const cities = [
    { label: "Qalqilya", value: "Qalqilya" },
    { label: "Nablus", value: "Nablus" },
    { label: "Tulkarm", value: "Tulkarm" },
    { label: "Jenin", value: "Jenin" },
    { label: "Hebron", value: "Hebron" },
    { label: "Bethlehem", value: "Bethlehem" },
    { label: "Jerusalem", value: "Jerusalem" },
    { label: "Ramallah", value: "Ramallah" },
    { label: "Other", value: "other" },
  ];

  const proficiencies = [
    { label: "Electrician", value: "electrician" },
    { label: "Plumber", value: "plumber" },
    { label: "Carpenter", value: "carpenter" },
    { label: "Painter", value: "painter" },
    { label: "Mechanic", value: "mechanic" },
    { label: "Gardener", value: "gardener" },
    { label: "Driver", value: "driver" },
    { label: "Housekeeper", value: "housekeeper" },
    { label: "Chef", value: "chef" },
    { label: "Teacher", value: "teacher" },
    { label: "Tutor", value: "tutor" },
    { label: "Babysitter", value: "babysitter" },
    { label: "Personal Trainer", value: "personal_trainer" },
    { label: "IT Specialist", value: "it_specialist" },
    { label: "Web Developer", value: "web_developer" },
    { label: "Designer", value: "designer" },
    { label: "Translator", value: "translator" },
    { label: "Marketing Specialist", value: "marketing_specialist" },
    { label: "Salesperson", value: "salesperson" },
    { label: "Customer Support", value: "customer_support" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Engineer", value: "engineer" },
    { label: "Lawyer", value: "lawyer" },
    { label: "Barber", value: "barber" },
    { label: "Accountant", value: "accountant" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Social Worker", value: "social_worker" },
    { label: "Psychologist", value: "psychologist" },
    { label: "Architect", value: "architect" },
    { label: "Other", value: "other" },
  ];

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    } else {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      let regionName = await Location.reverseGeocodeAsync({
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
      });
      console.log(regionName, "nothing");
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  async function getCityName(latitude, longitude, apiKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;

        // Find the city from address components
        const cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );

        return cityComponent ? cityComponent.long_name : "City not found";
      } else {
        throw new Error(`Error: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error getting city name:", error.message);
      throw error;
    }
  }

  (async () => {
    const apiKey = "AIzaSyAFRRxD0w9k4pdQ4PYsnxHGBGa_GbVYljU";
    try {
      console.log(mapRegion.latitude, mapRegion.longitude);
      const city = await getCityName(
        mapRegion.latitude,
        mapRegion.longitude,
        apiKey
      );
      console.log("City Name:", city);
    } catch (error) {
      console.error("Error fetching city name:", error.message);
    }
  })();

  const handleSignUp = () => {
    if (city && career && password) {
      const selectCity = city === "other" ? anotherCity : city;
      const selectCareer = career === "other" ? anotherCareer : career;
      console.log("User data:", {
        firstName,
        lastName,
        username,
        gender,
        dateOfBirth,
        email,
        city: selectCity,
        career: selectCareer,
        password,
      });
      alert("Welcome to Career!!!");
    } else {
      alert("Please fill all fields");
    }
  };

  const handlePrevious = function () {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Personal Information</Text>

        {/* City Dropdown */}
        <Dropdown
          style={[styles.dropdown, { borderColor: "#58d68d", borderWidth: 1 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cities}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!cityFocus ? "Select City" : "..."}
          searchPlaceholder="Search..."
          value={city}
          onFocus={() => setCityFocus(true)}
          onBlur={() => setCityFocus(false)}
          onChange={(item) => {
            setCity(item.value);
            setCityFocus(false);
          }}
        />

        {/* Additional City Input */}
        {city === "other" && (
          <TextInput
            style={styles.textInput}
            placeholder="City Name"
            onChangeText={(text) => setAnotherCity(text)}
            value={anotherCity.trim()}
          />
        )}

        {/* Career Dropdown */}
        <Dropdown
          style={[styles.dropdown, { borderColor: "#58d68d", borderWidth: 1 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={proficiencies}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!careerFocus ? "Select Career" : "..."}
          searchPlaceholder="Search..."
          value={career}
          onFocus={() => setCareerFocus(true)}
          onBlur={() => setCareerFocus(false)}
          onChange={(item) => {
            setCareer(item.value);
            setCareerFocus(false);
          }}
        />

        {/* Additional Career Input */}
        {career === "other" && (
          <TextInput
            placeholder="Your Career"
            style={styles.textInput}
            value={anotherCareer.trim()}
            onChangeText={setAnotherCareer}
          />
        )}

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password.trim()}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable onPress={handlePrevious} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Pressable onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>

      {/* Google Map */}
      <View>
        <MapView
          region={mapRegion}
          style={{ width: "100%", height: 200 }}
          showsUserLocation={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdditionalInfo;
