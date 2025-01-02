import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const MyProjects = () => {
  const navigation = useNavigation();
  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      content: "This is a creative project about exploring new ideas.",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      location: "New York, USA",
    },
    {
      id: 2,
      title: "Project Beta",
      content: "An innovative solution for modern problems.",
      image: "https://via.placeholder.com/150",
      rating: 4.8,
      location: "London, UK",
    },
    {
      id: 3,
      title: "Project Gamma",
      content: "Building next-gen apps with cutting-edge technologies.",
      image: "https://via.placeholder.com/150",
      rating: 5.0,
      location: "Berlin, Germany",
    },
  ];

  const editProject = async (project: any) => {
    navigation.navigate("EditProject", { project });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Projects</Text>
      <ScrollView style={styles.scrollView}>
        {projects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
            />
            <View style={styles.projectDetails}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectContent}>{project.content}</Text>
              <Text style={styles.projectRating}>⭐ {project.rating}</Text>
              <Text style={styles.projectLocation}>📍 {project.location}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editProject(project)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => console.log("Delete")}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateProject")}
      >
        <Text style={styles.createButtonText}>Create New Project</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  projectDetails: {
    marginTop: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectContent: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
  },
  projectRating: {
    fontSize: 14,
    marginBottom: 5,
  },
  projectLocation: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyProjects;
