import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../assets/styles/SignupStyle";
import Header from "@/components/General Components/Header";
import ButtonGroup from "@/components/General Components/ButtonGroup";
import Password from "@/components/Password/Password";
import Amazon from "../../Services/Amazon";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";

type SignUpStackParamList = {
  PasswordPage: {
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    city: string;
    latitude: number;
    longitude: number;
    category: string;
    career: string;
    bio: string;
    experience: string;
  };
};

type PasswordPageProps = NativeStackScreenProps<
  SignUpStackParamList,
  "PasswordPage"
>;

const PasswordPage: React.FC<PasswordPageProps> = ({ navigation, route }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [certificates, setCertificates] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const {
    firstName,
    lastName,
    username,
    profileImage,
    gender,
    dateOfBirth,
    email,
    city,
    latitude,
    longitude,
    category,
    career,
    bio,
    experience,
  } = route.params;

  const handleSelectCertificates = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: true,
      });

      if (!result.canceled) {
        const uris = result.assets.map((asset) => asset.uri);
        setCertificates((prev) => [...prev, ...uris]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick documents.");
    }
  };

  const handleSelectImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const uris = result.assets.map((asset) => asset.uri);
        setImages((prev) => [...prev, ...uris]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick images.");
    }
  };

  const handleRemoveItem = (type: "certificates" | "images", index: number) => {
    if (type === "certificates") {
      setCertificates((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleNext = async () => {
    if (!password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const uploadedCertificates = await Promise.all(
        certificates.map(async (uri) => {
          const uniqueId = uuidv4();
          const ext = uri.split(".").pop();
          const newFileName = `certificates/pdf/${uniqueId}.${ext}`.trim();
          return await Amazon.uploadFileToS3(newFileName, uri);
        })
      );

      const uploadedImages = await Promise.all(
        images.map(async (uri) => {
          const uniqueId = uuidv4();
          const ext = uri.split(".").pop();
          const newFileName = `certificates/images/${uniqueId}.${ext}`.trim();
          return await Amazon.uploadImageToS3(newFileName, uri);
        })
      );

      const response = await axios.post(`${ayhamWifiUrl}/api/auth/register`, {
        username,
        email,
        password,
        role: "user",
        gender,
        city,
        dateOfBirth,
        career,
        careerCategory: category,
        profile: {
          firstName,
          lastName,
          bio,
          experience,
          phone: "+970594387038",
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          profileImage,
          certificates: uploadedCertificates,
          additionalImages: uploadedImages,
        },
        verificationStatus: false,
        tokens: [],
        friendRequests: [],
        friends: [],
        sendRequests: [],
        resetCode: 0,
        resetCodeExpires: new Date().toISOString(),
      });

      if (response.status === 201) {
        Alert.alert(
          "🎉 Success 🎉",
          "Your account has been created successfully! 🚀 Ready to explore amazing features?",
          [
            {
              text: "Let's Go! 🚀",
              onPress: () => navigation.navigate("MainNavigation"),
            },
          ]
        );
      }
    } catch (error) {
      console.log("Error", error);
      Alert.alert(
        "❌ Oops!",
        "Something went wrong while creating your account. 😔 Please try again or check your details.",
        [
          {
            text: "Retry 🔄",
            onPress: () => console.log("User attempts to retry"),
          },
          { text: "Cancel ❌", style: "cancel" },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Header title="Password Page" />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Password
            placeholder="Enter password"
            password={password}
            onChangeText={setPassword}
          />
          <Password
            placeholder="Confirm Password"
            password={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Text style={styles.sectionTitle}>Upload Certificates</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleSelectCertificates}
          >
            <Text style={styles.uploadButtonText}>Choose Certificates</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.previewContainer}
            showsHorizontalScrollIndicator={false}
          >
            {certificates.map((uri, index) => (
              <View key={index} style={styles.previewItem}>
                <Text style={styles.previewText}>Certificate {index + 1}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveItem("certificates", index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Upload Images</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleSelectImages}
          >
            <Text style={styles.uploadButtonText}>Choose Images</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.previewContainer}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((uri, index) => (
              <View key={index} style={styles.previewItem}>
                <Image
                  source={{ uri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => handleRemoveItem("images", index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <ButtonGroup onPrevious={navigation.goBack} onNext={handleNext} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordPage;
