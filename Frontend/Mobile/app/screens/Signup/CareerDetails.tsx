import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SignUpStackParamList } from "./types";
type CareerDetailsProps = NativeStackScreenProps<
  SignUpStackParamList,
  "CareerDetails"
>;

const CareerDetails: React.FC<CareerDetailsProps> = ({ navigation, route }) => {
  const {
    firstName,
    lastName,
    username,
    gender,
    dateOfBirth,
    email,
    city: selectCity,
    latitude,
    longitude,
  } = route.params;
  console.log("CareerDetails", route.params);
};

export default CareerDetails;
