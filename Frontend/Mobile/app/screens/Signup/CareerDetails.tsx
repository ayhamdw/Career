import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SignUpStackParamList } from "./types";
import styles from "../../../assets/styles/SignupStyle";
import { ScrollView } from "react-native-gesture-handler";
import Header from "@/components/General Components/Header";
import CategoryDropdown from "@/components/CareerDetails/CategoryDropdown";
import DropDownTitle from "@/components/CareerDetails/DropDownTitle";
import CareerDropdown from "@/components/CareerDetails/CareerDropdown";
import MultiLineInputText from "@/components/CareerDetails/MultiLineInputText";
import ButtonGroup from "@/components/General Components/ButtonGroup";

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
          <Header title="Complete Your Profile" />
          <DropDownTitle title="Select Category" />
          <CategoryDropdown
            category={category}
            setCategory={setCategory}
            categoryFocus={categoryFocus}
            setCategoryFocus={setCategoryFocus}
            setCareer={setCareer}
            categories={categories}
            categoryDate={[]}
          />

          <DropDownTitle title="Select Career" />
          <CareerDropdown
            selectedCategoryCareers={selectedCategoryCareers}
            careerFocus={careerFocus}
            career={career}
            setCareer={setCareer}
            setCareerFocus={setCareerFocus}
          />
          <DropDownTitle title="Write Bio" />
          <MultiLineInputText onChangeText={setBio} value={bio} />
          <DropDownTitle title="Write Experience" />
          <MultiLineInputText onChangeText={setExperience} value={experience} />
          <ButtonGroup onPrevious={handlePrevious} onNext={handleNext} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CareerDetails;
