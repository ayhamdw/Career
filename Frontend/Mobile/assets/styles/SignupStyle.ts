import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderColor: "#58d68d",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  genderSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: "#58d68d",
    height: 50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  unselectedButton: {
    backgroundColor: "#e0e0e0",
    height: 50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  unselectedButtonText: {
    color: "#333",
  },
  dateInputContainer: {
    height: 50,
    justifyContent: "center",
    borderColor: "#58d68d",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  dateInputText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#58d68d",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dropdown: {
    marginBottom:15 ,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
  },

  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: "#EAECEF",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    alignSelf: "center"
  },
  iconSignupStyle: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginLeft: 10,
  },
  signupWith: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "center",
  }
});
