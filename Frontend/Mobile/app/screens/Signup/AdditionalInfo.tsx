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
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.9464,
    longitude: 35.3027,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [cities, setCities] = useState([
    { label: "Qalqiliya", value: "Qalqiliya" },
    { label: "Nablus", value: "Nablus" },
    { label: "Tulkarm", value: "Tulkarm" },
    { label: "Jenin", value: "Jenin" },
    { label: "Hebron", value: "Hebron" },
    { label: "Bethlehem", value: "Bethlehem" },
    { label: "Jerusalem", value: "Jerusalem" },
    { label: "Ramallah", value: "Ramallah" },
    { label: "Other", value: "other" },
  ]);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      let regionName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      const mapCity = regionName[0]?.city || "Unknown City";

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setCities((prevCities) => {
        if (!prevCities.find((item) => item.value === mapCity)) {
          return [{ label: mapCity, value: mapCity }, ...prevCities];
        }
        return prevCities;
      });

      setCity(mapCity);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  // async function getCityName(latitude, longitude, apiKey) {
  //   try {
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  //     const response = await axios.get(url);

  //     if (response.data.status === "OK" && response.data.results.length > 0) {
  //       const addressComponents = response.data.results[0].address_components;

  //       // Find the city from address components
  //       const cityComponent = addressComponents.find((component) =>
  //         component.types.includes("locality")
  //       );

  //       return cityComponent ? cityComponent.long_name : "City not found";
  //     } else {
  //       throw new Error(`Error: ${response.data.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error getting city name:", error.message);
  //     throw error;
  //   }
  // }

  // (async () => {
  //   const apiKey = "AIzaSyAFRRxD0w9k4pdQ4PYsnxHGBGa_GbVYljU";
  //   try {
  //     console.log(mapRegion.latitude, mapRegion.longitude);
  //     const city = await getCityName(
  //       mapRegion.latitude,
  //       mapRegion.longitude,
  //       apiKey
  //     );
  //     console.log("City Name:", city);
  //   } catch (error) {
  //     console.error("Error fetching city name:", error.message);
  //   }
  // })();

  const handleSignUp = () => {
    if (city) {
      const selectCity = city === "other" ? anotherCity : city;
      navigation.navigate("CareerDetails", {
        firstName,
        lastName,
        username,
        gender,
        dateOfBirth,
        email,
        city: selectCity,
        latitude,
        longitude,
      });
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

        {city === "other" && (
          <TextInput
            style={styles.textInput}
            placeholder="City Name"
            onChangeText={(text) => setAnotherCity(text)}
            value={anotherCity.trim()}
          />
        )}

        {/* <Dropdown
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

        {career === "other" && (
          <TextInput
            placeholder="Your Career"
            style={styles.textInput}
            value={anotherCareer.trim()}
            onChangeText={setAnotherCareer}
          />
        )} */}

        {/* <TextInput
          placeholder="Password"
          value={password.trim()}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        /> */}

        <View style={styles.buttonContainer}>
          <Pressable onPress={handlePrevious} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Pressable onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <MapView
          region={mapRegion}
          style={{ width: "100%", height: 500 }}
          showsUserLocation={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdditionalInfo;
