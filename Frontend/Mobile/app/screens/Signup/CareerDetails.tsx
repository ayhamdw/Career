import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SignUpStackParamList } from "./types";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../../assets/styles/SignupStyle";
import { ScrollView, TextInput } from "react-native-gesture-handler";

type CareerDetailsProps = NativeStackScreenProps<
  SignUpStackParamList,
  "CareerDetails"
>;

const CareerDetails: React.FC<CareerDetailsProps> = ({ navigation, route }) => {
  const [category, setCategory] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [categoryFocus, setCategoryFocus] = useState<boolean>(false);
  const [careerFocus, setCareerFocus] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  const {
    firstName,
    lastName,
    username,
    gender,
    dateOfBirth,
    email,
    city,
    latitude,
    longitude,
  } = route.params;

  const categories = [
    {
      category: "Technical Services",
      careers: [
        { label: "Electrician", value: "electrician" },
        { label: "Plumber", value: "plumber" },
        { label: "Carpenter", value: "carpenter" },
        { label: "Painter", value: "painter" },
        { label: "Mechanic", value: "mechanic" },
        { label: "IT Specialist", value: "it_specialist" },
        { label: "Web Developer", value: "web_developer" },
        { label: "Engineer", value: "engineer" },
        { label: "Architect", value: "architect" },
        { label: "Technician", value: "technician" },
      ],
    },
    {
      category: "Home Services",
      careers: [
        { label: "Gardener", value: "gardener" },
        { label: "Driver", value: "driver" },
        { label: "Housekeeper", value: "housekeeper" },
        { label: "Babysitter", value: "babysitter" },
        { label: "Chef", value: "chef" },
        { label: "Personal Trainer", value: "personal_trainer" },
        { label: "Barber", value: "barber" },
        { label: "Dog Walker", value: "dog_walker" },
        { label: "Laundry Specialist", value: "laundry_specialist" },
      ],
    },
    {
      category: "Educational Services",
      careers: [
        { label: "Teacher", value: "teacher" },
        { label: "Tutor", value: "tutor" },
        { label: "Translator", value: "translator" },
        { label: "Academic Advisor", value: "academic_advisor" },
        { label: "Librarian", value: "librarian" },
      ],
    },
    {
      category: "Healthcare",
      careers: [
        { label: "Doctor", value: "doctor" },
        { label: "Nurse", value: "nurse" },
        { label: "Pharmacist", value: "pharmacist" },
        { label: "Social Worker", value: "social_worker" },
        { label: "Psychologist", value: "psychologist" },
        { label: "Physiotherapist", value: "physiotherapist" },
        { label: "Chiropractor", value: "chiropractor" },
      ],
    },
    {
      category: "Creative Services",
      careers: [
        { label: "Designer", value: "designer" },
        { label: "Marketing Specialist", value: "marketing_specialist" },
        { label: "Salesperson", value: "salesperson" },
        { label: "Content Creator", value: "content_creator" },
        { label: "Photographer", value: "photographer" },
        { label: "Videographer", value: "videographer" },
        { label: "Copywriter", value: "copywriter" },
      ],
    },
    {
      category: "Legal & Financial Services",
      careers: [
        { label: "Lawyer", value: "lawyer" },
        { label: "Accountant", value: "accountant" },
        { label: "Tax Consultant", value: "tax_consultant" },
        { label: "Legal Advisor", value: "legal_advisor" },
        { label: "Financial Analyst", value: "financial_analyst" },
      ],
    },
    {
      category: "Other",
      careers: [
        { label: "Customer Support", value: "customer_support" },
        { label: "Event Planner", value: "event_planner" },
        { label: "Tour Guide", value: "tour_guide" },
        { label: "Barista", value: "barista" },
        { label: "Entrepreneur", value: "entrepreneur" },
        { label: "Freelancer", value: "freelancer" },
        { label: "Other", value: "other" },
      ],
    },
  ];

  const selectedCategoryCareers =
    categories.find((cat) => cat.category === category)?.careers || [];

  const handleNext = () => {
    if (!category || !career || !setBio) {
      alert("Please Fill All Fields");
      return;
    }
    navigation.navigate("PasswordPage", {
      firstName,
      lastName,
      username,
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
    });
  };

  const handlePrevious = function () {
    console.log("Previous");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView style={{ height: "100%", backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <Text style={styles.headerText}>About You</Text>
          <Text style={styles.label}>Select Category</Text>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: "#58d68d", borderWidth: 1 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={categories.map((cat) => ({
              label: cat.category,
              value: cat.category,
            }))}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!categoryFocus ? "Select Category" : "..."}
            searchPlaceholder="Search Category..."
            value={category}
            onFocus={() => setCategoryFocus(true)}
            onBlur={() => setCategoryFocus(false)}
            onChange={(item) => {
              setCategory(item.value);
              setCategoryFocus(false);
              setCareer("");
            }}
          />

          <Text style={styles.label}>Select Career</Text>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: "#58d68d", borderWidth: 1 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={selectedCategoryCareers}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!careerFocus ? "Select Career" : "..."}
            searchPlaceholder="Search Career..."
            value={career}
            onFocus={() => setCareerFocus(true)}
            onBlur={() => setCareerFocus(false)}
            onChange={(item) => {
              setCareer(item.value);
              setCareerFocus(false);
            }}
          />
          <Text style={styles.label}>Write Bio</Text>
          <TextInput
            multiline={true}
            style={[styles.textInput, { height: 100 }]}
            onChangeText={(text) => setBio(text)}
            value={bio}
          />
          <Text style={styles.label}>Write Experience</Text>
          <TextInput
            multiline={true}
            style={[styles.textInput, { height: 100 }]}
            onChangeText={(text) => setExperience(text)}
            value={experience}
          />
          <View style={[styles.buttonContainer]}>
            <Pressable
              onPress={() => console.log("test")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </Pressable>

            <Pressable onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CareerDetails;
