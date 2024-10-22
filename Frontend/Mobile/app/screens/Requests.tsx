import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Requests = ({ user }) => {
  return (
    <View>
      <Text>Requests {user.firstName}</Text>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({});
