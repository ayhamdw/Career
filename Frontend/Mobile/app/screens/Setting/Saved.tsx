import { View, Text, Pressable } from "react-native";
import React from "react";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Saved({ user }) {
  const userId = user._id;
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${ayhamWifiUrl}/api/community/getSavedPosts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        style={{ borderWidth: 1, padding: 10 }}
        onPress={() => fetchData()}
      >
        <Text>Get Data</Text>
      </Pressable>
    </View>
  );
}
