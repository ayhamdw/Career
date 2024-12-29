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
import Amazon from "@/app/Services/Amazon";
import uuid from "react-native-uuid";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const PALESTINIAN_CITIES = [
  { title: "Jerusalem", value: "Jerusalem" },
  { title: "Gaza", value: "Gaza" },
  { title: "Nablus", value: "Nablus" },
  { title: "Ramallah", value: "Ramallah" },
  { title: "Hebron", value: "Hebron" },
  { title: "Jenin", value: "Jenin" },
  { title: "Bethlehem", value: "Bethlehem" },
  { title: "Tulkarm", value: "Tulkarm" },
  { title: "Qalqilya", value: "Qalqilya" },
  { title: "Salfit", value: "Salfit" },
  { title: "Jericho", value: "Jericho" },
  { title: "Yatta", value: "Yatta" },
  { title: "Dura", value: "Dura" },
  { title: "Halhul", value: "Halhul" },
  { title: "Tubas", value: "Tubas" },
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
  const [categoryFocus, setCategoryFocus] = useState(false);
  const [locationFocus, setLocationFocus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfWorker, setNumberOfWorker] = useState("");
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [tempPhotos, setTempPhotos] = useState([]);

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
      setTempPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  }, []);

  const submit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const uploadImages = await uploadPhotos(tempPhotos);
      const response = await axios.post(
        `${ayhamWifiUrl}/api/community/post`,
        {
          title,
          content: description,
          numberOfWorker,
          careerCategory: category,
          location,
          photos: uploadImages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Post created successfully");
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  const uploadPhotos = async (tempPhotos) => {
    const photos = [];
    for (const element of tempPhotos) {
      const uniqueId = uuid.v4();
      const photo = element;
      const ext = photo.split(".").pop();
      const newFileName = `posts/${uniqueId}.${ext}`.trim();
      const url = await Amazon.uploadImageToS3(newFileName, photo);
      photos.push(url);
    }
    return photos;
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
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Write Post Title"
            multiline={undefined}
            keyboardType={undefined}
          />
          <InputField
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Write Post Description"
            multiline
            keyboardType={undefined}
          />
          <InputField
            label="Number of Workers"
            value={numberOfWorker}
            onChangeText={(text) => setNumberOfWorker(text)}
            placeholder="Enter number of workers"
            keyboardType="numeric"
            multiline={undefined}
          />

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
              value={category}
              onFocus={() => setCategoryFocus(true)}
              onBlur={() => setCategoryFocus(false)}
              onChange={(item) => setCategory(item.value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <Dropdown
              style={[
                styles.dropdown,
                locationFocus && { borderColor: "#58d68d" },
              ]}
              data={PALESTINIAN_CITIES}
              labelField="title"
              valueField="value"
              placeholder={!locationFocus ? "Select Location" : "..."}
              value={location}
              onFocus={() => setLocationFocus(true)}
              onBlur={() => setLocationFocus(false)}
              onChange={(item) => setLocation(item.value)}
            />
          </View>

          <PhotoUploader photos={tempPhotos} onAddPhoto={handlePhotoUpload} />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => submit()}
          >
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
