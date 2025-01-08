import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditPost() {
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
              marginLeft: -10,
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: "white",
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <Text>EditPost</Text>
    </View>
  );
}
