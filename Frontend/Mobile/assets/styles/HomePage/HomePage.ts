import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

      tipsSection: {
        marginTop: 10,
        paddingHorizontal: 15,
      },
    
      proficientRecommendationStyle: {
        marginTop: 25,
      },
     
      listItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        width: "100%",
      },

      emptyText: {
        textAlign: "center",
        marginTop: 20,
        marginVertical: 20,
        fontSize: 16,
        color: "#999",
      },

      container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      },
      searchBar: {
        backgroundColor: "#e0e0e0",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      },
      placeholderText: {
        color: "#888",
      },
      modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      },
      input: {
        height: 50,
        width: "90%",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        alignSelf: "center",
      },
      section: {
        marginBottom: 30,
      },
      scrollContainer: {
        backgroundColor: "#f9f9f9",
      },
      modalBackdrop: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",

      },
      modalContent: {
        width: "90%",
        height: "70%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "center",
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: "#ff6b6b",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        alignSelf:"center"
      },
      

});

export default styles