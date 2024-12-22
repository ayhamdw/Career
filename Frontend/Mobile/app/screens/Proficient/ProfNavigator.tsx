import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfProfile from "./ProfProfile";
import RequestDetailsPage from "./RequestDetailsPage";
import { useRoute, RouteProp } from "@react-navigation/native";
import MapTracker from "./MapTracker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Stack = createNativeStackNavigator();

interface User {
  _id: string;
  career: string;
  careerCategory: string;
  city: string;
  email: string;
  profile: {
    bio: string;
    experience: string;
    firstName: string;
    lastName: string;
    location: {
      coordinates: [number, number];
      type: string;
    };
    numberOfRequest: number;
    phone: string;
    profileImage: string;
    ratings: {
      rating: number;
      review: string;
      userId: string;
      date: Date;
    }[];
  };
}

interface Proficient {
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    experience: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    ratings: {
      rating: number;
      review: string;
      userId: string;
      date: Date;
    }[];
  };
  email: string;
  city: string;
  career: string;
  careerCategory: string;
}

type ProfNavigatorParams = {
  ProfProfile: { proficientDetails: Proficient; user: User };
  RequestDetailsPage: { proficientDetails: Proficient; user: User };
};

export default function ProfNavigator({ user }: { user: User }) {
  const route = useRoute<RouteProp<ProfNavigatorParams, "ProfProfile">>();
  const { proficientDetails } = route.params;
  const navigation = useNavigation();
  const screenData = useMemo(
    () => ({
      ProfProfile: (props: any) => (
        <ProfProfile
          {...props}
          proficientDetails={proficientDetails}
          user={user}
        />
      ),
      RequestDetailsPage: (props: any) => (
        <RequestDetailsPage
          {...props}
          proficientDetails={proficientDetails}
          user={user}
        />
      ),
    }),
    [proficientDetails, user]
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackground: () => (
        <LinearGradient
          colors={["#96c93d", "#00b09b"]}
          style={styles.headerGradient}
        ></LinearGradient>
      ),
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerLeft: () => {
        return (
          <View style={styles.headerContainer}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            />
          </View>
        );
      },
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName="ProfProfile">
      <Stack.Screen
        name="ProfProfile"
        component={screenData.ProfProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestDetailsPage"
        component={screenData.RequestDetailsPage}
        options={{ headerShadowVisible: false }}
      />
      <Stack.Screen
        name="MapTracker"
        component={MapTracker}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  backIcon: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 30,
  },
});
