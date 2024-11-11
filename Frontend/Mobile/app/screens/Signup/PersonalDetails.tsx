import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";
import axios, { AxiosError } from "axios";

type PersonalDetailsProps = NativeStackScreenProps<
  SignUpStackParamList,
  "PersonalDetails"
>;

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  navigation,
  route,
}) => {
  const { firstName, lastName, username } = route.params;
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(currentDate);
    }
  };

  const handleNext = async () => {
    if (gender && email && dateOfBirth) {
      try {
        const response = await axios.post(
          "http://192.168.1.21:7777/api/check/email",
          {
            email,
          }
        );

        if (response.status === 200) {
          console.log("Done");
          navigation.navigate("Verification", {
            firstName,
            lastName,
            username,
            gender,
            dateOfBirth,
            email,
          });
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
          alert("Email already exists");
        } else {
          alert("Something went wrong");
        }
      }
    } else {
      alert("Please complete all fields");
    }
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Complete Your Profile</Text>

        <View style={styles.genderSelectionContainer}>
          <Pressable
            onPress={() => setGender("Male")}
            style={
              gender === "Male"
                ? styles.selectedButton
                : styles.unselectedButton
            }
          >
            <Text
              style={
                gender === "Male"
                  ? styles.selectedButtonText
                  : styles.unselectedButtonText
              }
            >
              Male
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setGender("Female")}
            style={
              gender === "Female"
                ? styles.selectedButton
                : styles.unselectedButton
            }
          >
            <Text
              style={
                gender === "Female"
                  ? styles.selectedButtonText
                  : styles.unselectedButtonText
              }
            >
              Female
            </Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Date of Birth:</Text>
        {/* <Pressable
        style={styles.dateInputContainer}
        onPress={() => setShowDatePicker(true)}
        >
        <Text style={styles.dateInputText}>
        {dateOfBirth
        ? `${dateOfBirth.getDate()}-${
          dateOfBirth.getMonth() + 1
          }-${dateOfBirth.getFullYear()}`
          : "Select Date"}
          </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
            value={dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
            testID="datePicker"
            />
            )} */}

        <Pressable
          style={styles.dateInputContainer}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateInputText}>
            {dateOfBirth
              ? `${dateOfBirth.getDate()}-${
                  dateOfBirth.getMonth() + 1
                }-${dateOfBirth.getFullYear()}`
              : "Select Date"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
            testID="datePicker"
          />
        )}

        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.textInput}
        />

        <View style={styles.buttonContainer}>
          <Pressable onPress={handlePrevious} style={styles.button}>
            <Text style={styles.buttonText}>previous</Text>
          </Pressable>

          <Pressable onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
        {/* </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;
