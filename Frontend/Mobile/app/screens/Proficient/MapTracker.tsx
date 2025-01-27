import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function MapTracker() {
  const route = useRoute();
  const navigation = useNavigation();
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

  const trackUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        setMapRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        if (loading) setLoading(false);
      }
    );
  };

  useEffect(() => {
    trackUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Real-Time Path Tracker</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Distance: {distance}</Text>
        <Text style={styles.infoText}>Duration: {duration}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#58d68d" style={styles.loader} />
      ) : (
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
            origin={{ latitude: latitude, longitude: longitude }}
            destination={{ latitude: userLat, longitude: userLong }}
            apikey={GOOGLE_API_KEY}
            mode="DRIVING"
            strokeWidth={6}
            strokeColor="#3498db"
            onReady={(result) => {
              setDistance(result.distance.toFixed(2) + " km");
              setDuration(Math.round(result.duration) + " mins");
            }}
            onError={(errorMessage) => {
              console.error("Directions error:", errorMessage);
            }}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58d68d",
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
