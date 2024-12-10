import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { useRoute } from "@react-navigation/native";

export default function MapTracker() {
  const route = useRoute();
  const item = route.params.item;
  const userLat = item.location.coordinates[0];
  const userLong = item.location.coordinates[1];

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

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_APIS_KEY || "";
  console.log("Google API Key:", GOOGLE_API_KEY);

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
        latitude: (latitude + userLat) / 2,
        longitude: (longitude + userLong) / 2,
        latitudeDelta: Math.abs(latitude - userLat) + 0.1,
        longitudeDelta: Math.abs(longitude - userLong) + 0.1,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);
  console.log("User Location:", { latitude, longitude });
  console.log("Destination:", { userLat, userLong });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {loading ? (
          <ActivityIndicator size="large" color="#f00" />
        ) : (
          <Text style={styles.info}>Path Between You & User</Text>
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
          title="User"
          pinColor="green"
        />
        <MapViewDirections
          origin={{
            latitude: 32.1878265463798246,
            longitude: 34.970540759368244,
          }}
          destination={{
            latitude: 32.18275920631823,
            longitude: 34.97247777204734,
          }}
          apikey={GOOGLE_API_KEY}
          strokeWidth={4}
          strokeColor="#58d68d"
          onReady={(result) => {}}
          onError={(errorMessage) => {
            console.error("Directions error:", errorMessage);
            console.error("Origin:", {
              latitude: 32.1878265463798246,
              longitude: 34.970540759368244,
            });
            console.error("Destination:", {
              latitude: 32.18275920631823,
              longitude: 34.97247777204734,
            });
          }}
        />
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Distance: {distance} | Duration: {duration}
        </Text>
      </View>
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
  footer: {
    padding: 10,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
});
