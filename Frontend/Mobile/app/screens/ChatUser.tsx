import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ChatUser = ({ user }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView></ScrollView>
      <View style={styles.parentStyle}>
        <View style={styles.emojiWithTextInputStyle}>
          <Entypo name="emoji-happy" size={24} color="black" />
          <TextInput
            style={styles.textInputStyle}
            placeholder="write your message"
          />
        </View>
        <View style={styles.cameraWithMicAndSendButtonStyle}>
          <Feather name="camera" size={24} color="black" />
          <SimpleLineIcons name="microphone" size={24} color="black" />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendTextStyle}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  parentStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
  },
  emojiWithTextInputStyle: {
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  cameraWithMicAndSendButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sendButton: {
    backgroundColor: "#58D68D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  sendTextStyle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
