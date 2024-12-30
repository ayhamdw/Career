import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProjectDetails() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginLeft: -10,
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <Text>ProjectDetails</Text>
    </View>
  );
}
