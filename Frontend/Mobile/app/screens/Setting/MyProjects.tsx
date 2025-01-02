import { ayhamWifiUrl } from "@/constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const MyProjects = ({ user }: { user: any }) => {
  const navigation = useNavigation();
  const [projects, setProjects] = React.useState([]);
  // const projects = [
  //   {
  //     id: 1,
  //     title: "Project Alpha",
  //     content: "This is a creative project about exploring new ideas.",
  //     image: "https://via.placeholder.com/150",
  //     rating: 4.5,
  //     location: "New York, USA",
  //   },
  //   {
  //     id: 2,
  //     title: "Project Beta",
  //     content: "An innovative solution for modern problems.",
  //     image: "https://via.placeholder.com/150",
  //     rating: 4.8,
  //     location: "London, UK",
  //   },
  //   {
  //     id: 3,
  //     title: "Project Gamma",
  //     content: "Building next-gen apps with cutting-edge technologies.",
  //     image: "https://via.placeholder.com/150",
  //     rating: 5.0,
  //     location: "Berlin, Germany",
  //   },
  // ];

  const editProject = async (project: any) => {
    navigation.navigate("EditProject", { project });
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/projects/get-my-projects/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProjects(response.data.projects);
        console.log(response.data.projects);
        console.log(response.data.projects[0].images);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${ayhamWifiUrl}/api/projects/delete-project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Project deleted successfully");
        fetchData();
      } else {
        console.log("Error deleting project");
      }
    } catch (error) {
      console.log("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user._id]);

  // useFocusEffect(() => {
  //   fetchData();
  // });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Projects</Text>
      {projects.length === 0 && (
        <View style={styles.noProjectFoundContainer}>
          <Text style={styles.noProjectFound}>
            No projects found. Create a new project to get started!
          </Text>
          <Image
            source={require("../../../assets/images/project-team.png")}
            style={styles.imageStyle}
          />
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        {projects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <Image
              source={{ uri: project.images[0] }}
              style={styles.projectImage}
            />
            <View style={styles.projectDetails}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectContent}>{project.content}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editProject(project)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteProject(project._id)}
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
        onPress={() => navigation.navigate("CreateProject", { user })}
      >
        <Text style={styles.createButtonText}>Create New Project</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginVertical: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  projectImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  projectDetails: {
    marginTop: 10,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  projectContent: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 10,
    width: "48%",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    paddingVertical: 10,
    width: "48%",
    alignItems: "center",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  createButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  noProjectFound: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
    textAlign: "center",
    marginTop: 50,
    alignSelf: "center",
  },
  noProjectFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 250,
    height: 250,
    marginTop: 50,
  },
});

export default MyProjects;
