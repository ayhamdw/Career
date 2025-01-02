import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function EditProject({ route, navigation }) {
  const { project } = route.params;

  const [title, setTitle] = useState(project.title);
  const [content, setContent] = useState(project.content);
  const [images, setImages] = useState(project.images || []);
  const [location, setLocation] = useState(project.location);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const deleteImage = (image: string) => {
    setImages(images.filter((img: string) => img !== image));
  };

  const saveChanges = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${ayhamWifiUrl}/api/projects/update-project/${id}`,
        {
          title,
          content,
          images,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Toast.show({
          text1: "Project updated successfully 🎉",
          type: "success",
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Project</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter project title"
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter project content"
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.label}>Images</Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => deleteImage(image)}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>Pick Images</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveChanges(project._id)}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#ced4da",
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "#6c757d",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
