import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TextFieldComponent from "@/components/Setting/ProfileInfo/TextFieldComponent";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormDataType {
  firstName: string;
  lastName: string;
  career: string;
  email: string;
  bio: string;
  experience: string;
}

const ProfileInfo = ({ user }: { user: any }) => {
  const [originalData, setOriginalData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    career: "",
    email: "",
    bio: "",
    experience: "",
  });

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    career: "",
    email: "",
    bio: "",
    experience: "",
  });

  const [newData, setNewData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    career: "",
    email: "",
    bio: "",
    experience: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value }); //! Change The Value That I Changed it in Text Input
  };

  const handleSave = async () => {
    const changedFields = getChangedFields();
    console.log(changedFields);
    console.log(ayhamWifiUrl);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${ayhamWifiUrl}/api/user/update/profile`,
        { changedFields, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert(
          "Profile Updated 🎉", // Title
          "Your information has been updated successfully!", // Message
          [
            {
              text: "OK",
              onPress: () => console.log("Alert closed"),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Update Failed 🚨", // Title
        "Something went wrong. Please try again.", // Message
        [
          {
            text: "Retry",
            onPress: () => console.log("Retry pressed"),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  useEffect(() => {
    console.log("Fetching user data...");

    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          `${ayhamWifiUrl}/api/user/me/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const userData = {
            firstName: response.data.profile.firstName,
            lastName: response.data.profile.lastName,
            career: response.data.career,
            email: response.data.email,
            bio: response.data.profile.bio,
            experience: response.data.profile.experience,
          };

          setOriginalData(userData);
          setFormData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);
  const getChangedFields = () => {
    const changedFields: Partial<FormDataType> = {};
    for (const key in formData) {
      if (
        formData[key as keyof FormDataType] !==
        originalData[key as keyof FormDataType]
      ) {
        changedFields[key as keyof FormDataType] =
          formData[key as keyof FormDataType];
      }
    }
    return changedFields;
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <LinearGradient
        colors={["#58d68d", "#28a745"]}
        style={{
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Profile Information
        </Text>
      </LinearGradient>
      <ScrollView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <StatusBar barStyle="dark-content" />

        <TextFieldComponent
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          placeholder="First Name"
        />
        <TextFieldComponent
          label="Second Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          placeholder="Second Name"
        />
        <TextFieldComponent
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Email"
        />
        <TextFieldComponent
          label="Career"
          value={formData.career}
          onChangeText={(text) => handleChange("career", text)}
          placeholder="Career"
        />
        <TextFieldComponent
          label="Bio"
          value={formData.bio}
          onChangeText={(text) => handleChange("bio", text)}
          placeholder="Bio"
        />
        <TextFieldComponent
          label="Experience"
          value={formData.experience}
          onChangeText={(text) => handleChange("experience", text)}
          placeholder="Experience"
        />

        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              borderRadius: 10,
              overflow: "hidden",
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }}
            onPress={handleSave}
          >
            <LinearGradient
              colors={["#58d68d", "#28a745"]}
              style={{
                paddingVertical: 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Save
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileInfo;
