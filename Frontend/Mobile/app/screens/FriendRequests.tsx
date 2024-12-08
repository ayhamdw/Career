import { View, Text } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FriendRequests({ user }: { user: any }) {
  const id = user._id;
  const [senderUserData, setSenderUserData] = React.useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/sender-details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setSenderUserData(response.data);
          console.log("Sender User Data:", response.data);
        }
      } catch (error) {
        console.log("Error fetching sender user data:", error);
      }
    };
    fetchUserData();
  }, [id]);
  return (
    <View>
      <Text>test</Text>
    </View>
  );
}
