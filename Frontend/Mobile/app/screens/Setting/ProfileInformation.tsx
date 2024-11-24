import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TextFieldComponent from "@/components/Setting/ProfileInfo/TextFieldComponent";

interface formDataType {
  firstName: string;
  lastName: string;
  career: string;
  email: string;
  bio: string;
  experience: string;
}

const ProfileInfo = ({ user }: { user: any }) => {
  const [originalData, setOriginalData] = useState<formDataType>({
    firstName: "",
    lastName: "",
    career: "",
    email: "",
    bio: "",
    experience: "",
  });

  const [formData, setFormData] = useState<formDataType>({
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
  };

  useEffect(() => {
    const userDate = {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      career: user.career,
      email: user.email,
      bio: user.profile.bio,
      experience: user.profile.experience,
    };
    setOriginalData(userDate);
    setFormData(userDate);
  }, [user]);
  const getChangedFields = () => {
    const changedFields: Partial<formDataType> = {};
    for (const key in formData) {
      if (
        formData[key as keyof formDataType] !==
        originalData[key as keyof formDataType]
      ) {
        changedFields[key as keyof formDataType] =
          formData[key as keyof formDataType];
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
