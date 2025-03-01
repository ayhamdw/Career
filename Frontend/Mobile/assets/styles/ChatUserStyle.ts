import { StyleSheet } from "react-native";
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
    nameStyle: {
      alignContent: "center",
      fontWeight: "bold",
      fontSize: 16,
    },
    imageStyle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      resizeMode: "cover",
    },
    headerStyle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    senderMessageStyle: {
      alignSelf: "flex-end",
      backgroundColor: "#58D68D",
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      maxWidth: "60%",
    },
    receiverMessageStyle: {
      alignSelf: "flex-start",
      backgroundColor: "#dbdbdb",
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      maxWidth: "60%",
      borderRadius: 10,
    },
    messageStyle: {
      color: "black",
      fontSize: 16,
    },
    messageTimeStyle: {
      marginTop: 5,
      color: "#5e5353 ",
      fontSize: 10,
      textAlign: "right",
    },
    
  });

  export default styles