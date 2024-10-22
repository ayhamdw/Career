import { COLORS } from "@/assets/styles/Dimensions";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

const ProfileInfo = ({ route }) => {
  const user = route.params;
  console.log(user.firstName);
  const [qualifications, setQualifications] = useState([
    "Great communication skills",
    "Teamwork",
    "Problem-solving",
  ]);
  const [newQualification, setNewQualification] = useState("");

  const addQualification = () => {
    if (newQualification.trim() !== "") {
      setQualifications([...qualifications, newQualification]);
      setNewQualification("");
    }
  };

  const removeQualification = (index: number) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CEEB43" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile Information</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} placeholder="Enter first name" />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter last name" />

        <Text style={styles.label}>Career</Text>
        <TextInput style={styles.input} placeholder="Enter your career" />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Career Objectives</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter career objectives"
          multiline={true}
        />

        <Text style={styles.label}>Special Qualifications</Text>
        {qualifications.map((item, index) => (
          <View style={styles.listItemContainer} key={index}>
            <TextInput
              style={styles.listItem}
              value={item}
              onChangeText={(text) => {
                const updatedQualifications = [...qualifications];
                updatedQualifications[index] = text;
                setQualifications(updatedQualifications);
              }}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeQualification(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder="Add new qualification"
          value={newQualification}
          onChangeText={setNewQualification}
        />

        <TouchableOpacity style={styles.addButton} onPress={addQualification}>
          <Text style={styles.addButtonText}>Add Qualification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Changes Saved")}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  listItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: COLORS.buttonBackgroundColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    backgroundColor: COLORS.buttonBackgroundColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default ProfileInfo;
