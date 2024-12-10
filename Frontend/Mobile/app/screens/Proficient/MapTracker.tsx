import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function MapTracker() {
  const route = useRoute();
  const item = route.params.item;
  const userLat = item.location.coordinates[0];
  const userLong = item.location.coordinates[1];
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_APIS_KEY;
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.9464,
    longitude: 35.3027,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [distance, setDistance] = useState<string>("Calculating...");
  const [duration, setDuration] = useState<string>("Calculating...");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch User's Current Location
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetchDistanceAndDuration(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchDistanceAndDuration = async (lat: number, lng: number) => {
    const apiKey = "YOUR_GOOGLE_API_KEY";
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${userLat},${userLong}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await axios.get(url);
      const data = response.data.rows[0].elements[0];
      setDistance(data.distance.text);
      setDuration(data.duration.text);
    } catch (error) {
      console.error("Error fetching distance and duration:", error);
      setDistance("Unavailable");
      setDuration("Unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {loading ? (
          <ActivityIndicator size="large" color="#58d68d" />
        ) : (
          <Text style={styles.info}>
            Distance: {distance} | Duration: {duration}
          </Text>
        )}
      </View>
      <MapView
        region={mapRegion}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="You"
          pinColor="blue"
        />
        <Marker
          coordinate={{ latitude: userLat, longitude: userLong }}
          title="Professional"
          pinColor="green"
        />
        <Polyline
          coordinates={[
            { latitude: latitude, longitude: longitude },
            { latitude: userLat, longitude: userLong },
          ]}
          strokeColor="#58d68d"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 10,
    backgroundColor: "#58d68d",
    alignItems: "center",
  },
  info: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
