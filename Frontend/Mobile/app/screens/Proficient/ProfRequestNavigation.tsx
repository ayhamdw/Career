import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendRequests from "./FriendRequests";
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

export default function ProfRequestNavigation({ user }: { user: User }) {
  return (
    <Stack.Navigator initialRouteName="FriendRequests">
      <Stack.Screen name="FriendRequests" options={{ headerShown: false }}>
        {(props) => <FriendRequests {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="MapTracker"
        component={MapTracker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
