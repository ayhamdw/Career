import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function JobList() {
  const route = useRoute();
  console.log("Route:", route.params);
  return (
    <View>
      <Text>JobList</Text>
    </View>
  );
}
