import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import cities from "@/constants/Cities";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { uploadPhotos } from "../../Services/UploadPhotos";
import * as ImageManipulator from "expo-image-manipulator";

export default function EditPost({ route, navigation }) {
  const { postId, postDetails } = route.params;
  console.log("Post details:", postDetails);
  const [title, setTitle] = useState(postDetails.title);
  const [content, setContent] = useState(postDetails.content);
  const [dayRate, setDayRate] = useState(postDetails.dayRate.toString());
  const [location, setLocation] = useState(postDetails.location);
  const [numberOfWorker, setNumberOfWorker] = useState(
    postDetails.numberOfWorker.toString()
  );
  const [images, setImages] = useState(postDetails.images || []);

  const compressImage = async (uri) => {
    const compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return compressed.uri;
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const compressedPhotos = await Promise.all(images.map(compressImage));
      const uploadedPhotos = await uploadPhotos(compressedPhotos, postId);
      console.log("Title:", title);
      console.log("Content:", content);
      console.log("Day Rate:", dayRate);
      console.log("Location:", location);
      console.log("Number of Worker:", numberOfWorker);
      await axios.put(
        `${ayhamWifiUrl}/api/community/updatePost/${postId}`,
        {
          title,
          content,
          dayRate: parseInt(dayRate),
          location,
          numberOfWorker: parseInt(numberOfWorker),
          photos: uploadedPhotos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        text1: "Success",
        text2: "Post updated successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log("Error updating post:", error);
      Toast.show({
        text1: "Error",
        text2: "An error occurred. Please try again",
        type: "error",
      });
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Edit Post</Text>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Enter content"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Day Rate</Text>
        <TextInput
          style={styles.input}
          value={dayRate}
          onChangeText={setDayRate}
          placeholder="Enter day rate"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Location</Text>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
          style={styles.picker}
        >
          {cities.map((city) => (
            <Picker.Item label={city} value={city} key={city} />
          ))}
        </Picker>

        <Text style={styles.label}>Number of Workers</Text>
        <TextInput
          style={styles.input}
          value={numberOfWorker}
          onChangeText={setNumberOfWorker}
          placeholder="Enter number of workers"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Images</Text>
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteImageButton}
                onPress={() => removeImage(uri)}
              >
                <Text style={styles.deleteImageText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.pickImageButton} onPress={pickImages}>
          <Text style={styles.pickImageText}>Pick Images</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#f44336",
    borderRadius: 50,
    padding: 4,
  },
  deleteImageText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pickImageButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  pickImageText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    bottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
