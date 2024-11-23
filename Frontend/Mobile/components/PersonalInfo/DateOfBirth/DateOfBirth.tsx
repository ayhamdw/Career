import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../../../assets/styles/SignupStyle";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateOfBirthProps {
  setShowDatePicker: (value: boolean) => void;
  dateOfBirth: Date | null;
  showDatePicker: boolean;
  onChange: (event: any, selectedDate: any) => void;
}

const DateOfBirth: React.FC<DateOfBirthProps> = ({
  setShowDatePicker,
  dateOfBirth,
  showDatePicker,
  onChange,
}: DateOfBirthProps) => {
  return (
    <View>
      <Text style={styles.label}>Date of Birth:</Text>
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
    </View>
  );
};
export default DateOfBirth;
