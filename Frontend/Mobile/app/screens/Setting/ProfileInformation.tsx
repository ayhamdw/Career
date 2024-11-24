import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import styles from "../../../assets/styles/ProfileInformationStyle";

const ProfileInfo = ({ user }) => {
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

export default ProfileInfo;
