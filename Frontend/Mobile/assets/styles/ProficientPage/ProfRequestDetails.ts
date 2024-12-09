import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 16,
    },
    radioContainer: {
      flexDirection: "row",
      marginBottom: 16,
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
      gap: 20,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      alignItems: "center",
    },
    cancelledStatus: {
      backgroundColor: "#ff6b6b",
    },
    completedStatus: {
      backgroundColor: "#3498db",
    },
    statusText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    radioButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: "#f0f0f0",
      alignItems: "center",
      marginHorizontal: 4,
    },
    radioButtonActive: {
      backgroundColor: "#58d68d",
    },
    radioText: {
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },
    radioTextActive: {
      color: "#fff",
      fontWeight: "bold",
    },
    list: {
      paddingBottom: 16,
    },
    card: {
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    profession: {
      fontSize: 14,
      color: "#58d68d",
    },
    email: {
      fontSize: 14,
      color: "#888",
      marginVertical: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 2,
    },
    location: {
      marginLeft: 4,
      fontSize: 14,
      color: "#333",
    },
    time: {
      marginLeft: 4,
      fontSize: 14,
      color: "#333",
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 4,
      width: "100%",
    },
    acceptButton: {
      backgroundColor: "#58d68d",
    },
    rejectButton: {
      backgroundColor: "#ff6b6b",
    },
    cancelButton: {
      backgroundColor: "#f39c12",
    },
    completeButton: {
      backgroundColor: "#3498db",
    },
    mapButton: {
      backgroundColor: "#985174",
    },
    buttonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
  export default styles;