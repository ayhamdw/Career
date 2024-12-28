import React, { useLayoutEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

// Constants
const GOOGLE_API = process.env.EXPO_PUBLIC_GOOGLE_APIS_KEY;
const CAREER_CATEGORIES = [
  { title: "Technical Services", value: "Technical Services" },
  { title: "Home Services", value: "Home Services" },
  { title: "Educational Services", value: "Educational Services" },
  { title: "Healthcare", value: "Healthcare" },
  { title: "Creative Services", value: "Creative Services" },
  { title: "Legal & Financial Services", value: "Legal & Financial Services" },
  { title: "Other", value: "Other" },
];

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);
const PhotoUploader = ({ photos, onAddPhoto }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Photos</Text>
    <View style={styles.photoUploadContainer}>
      {photos.map((photo, index) => (
        <Image
          key={index}
          source={{ uri: photo }}
          style={styles.photoThumbnail}
        />
      ))}
      <TouchableOpacity style={styles.addPhotoButton} onPress={onAddPhoto}>
        <Ionicons name="add" size={24} color="#58d68d" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function CreatePost() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numberOfWorker: "",
    category: "",
    photos: [],
  });
  const [region, setRegion] = useState(null);
  const [categoryFocus, setCategoryFocus] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);

  const handlePhotoUpload = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, result.assets[0].uri],
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          <Text style={styles.createPostText}>Create Post</Text>

          <InputField
            label="Title"
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
            placeholder="Write Post Title"
            multiline={undefined}
            keyboardType={undefined}
          />
          <InputField
            label="Description"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            placeholder="Write Post Description"
            multiline
            keyboardType={undefined}
          />
          <InputField
            label="Number of Workers"
            value={formData.numberOfWorker}
            onChangeText={(text) => handleInputChange("numberOfWorker", text)}
            placeholder="Enter number of workers"
            keyboardType="numeric"
            multiline={undefined}
          />

          {/* Dropdown for Categories */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <Dropdown
              style={[
                styles.dropdown,
                categoryFocus && { borderColor: "#58d68d" },
              ]}
              data={CAREER_CATEGORIES}
              labelField="title"
              valueField="value"
              placeholder={!categoryFocus ? "Select Category" : "..."}
              value={formData.category}
              onFocus={() => setCategoryFocus(true)}
              onBlur={() => setCategoryFocus(false)}
              onChange={(item) => handleInputChange("category", item.value)}
            />
          </View>

          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                setRegion({ latitude: lat, longitude: lng });
              }
            }}
            query={{ key: GOOGLE_API, language: "en" }}
            fetchDetails
            styles={styles.autocomplete}
          />

          <PhotoUploader
            photos={formData.photos}
            onAddPhoto={handlePhotoUpload}
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  createPostText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
  },
  autocomplete: {
    textInput: {
      height: 45,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      backgroundColor: "#fff",
    },
    listView: {
      backgroundColor: "#fff",
      borderRadius: 10,
      marginVertical: 5,
    },
  },
  photoUploadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  addPhotoButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#58d68d",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#58d68d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
