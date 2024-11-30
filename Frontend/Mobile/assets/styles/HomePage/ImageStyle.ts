import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    tipImage: {
        borderRadius: 10,
        width: "100%",
        height: 150,
        resizeMode: "cover",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
      },
      tipText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      tipButton: {
        marginTop: 5,
        borderRadius: 10,
        overflow: "hidden",
      },
      tipOverlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      tipButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
      },
});

export default styles