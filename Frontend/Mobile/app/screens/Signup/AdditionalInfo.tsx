import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";
import * as Location from "expo-location";
import Header from "@/components/General Components/Header/Header";
import CityDropdown from "@/components/AdditionalInfo/CityDropdown/CityDropdown";
import TextInputWrapper from "@/components/AdditionalInfo/TextInputWrapper/TextInputWrapper";
import ButtonGroup from "@/components/General Components/ButtonGroup/ButtonGroup";
import MapComponent from "@/components/AdditionalInfo/MapComponent/MapComponent";

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
  const [cityFocus, setCityFocus] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [anotherCity, setAnotherCity] = useState<string>("");
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
        <Header title="Personal Information" />
        <CityDropdown
          cities={cities}
          city={city}
          setCity={setCity}
          setCityFocus={setCityFocus}
          cityFocus={cityFocus}
        />
        {city === "other" && (
          <TextInputWrapper
            placeholder="City Name"
            onChangeText={setAnotherCity}
            value={anotherCity.trim()}
          />
        )}
        <ButtonGroup onPrevious={handlePrevious} onNext={handleSignUp} />
        <MapComponent region={mapRegion} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdditionalInfo;
