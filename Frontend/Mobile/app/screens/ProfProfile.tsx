import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function ProfProfile() {
  const route = useRoute();
  const { job } = route.params;
  console.log(job.profile.firstName);
  return (
    <View>
      <Text>{job.profile.firstName}</Text>
    </View>
  );
}
