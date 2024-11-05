import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatUser = ({ user }) => {
  return (
    <KeyboardAvoidingView>
      <Text>Chat With {user.firstName}</Text>
    </KeyboardAvoidingView>
  );
};

export default ChatUser;

const styles = StyleSheet.create({});
