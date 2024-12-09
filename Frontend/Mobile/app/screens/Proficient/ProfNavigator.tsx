import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfProfile from "./ProfProfile";
import RequestDetailsPage from "./RequestDetailsPage";
import { useRoute, RouteProp } from "@react-navigation/native";
import MapTracker from "./MapTracker";

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapTracker"
        component={MapTracker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
