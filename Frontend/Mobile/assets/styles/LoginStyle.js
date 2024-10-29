import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  loginPage: {
    height: "100%",
    marginTop: -50,
    marginBottom: -50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    // height:'85%',
    maxWidth: 500,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    display: "flex",
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  signLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    gap: 10,
  },
  ImgLogo: {
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  signText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  jetakText: {
    fontSize: 40,
    fontFamily: "Cairo",
  },
  par: {
    fontSize: 14,
  },
  form: {
    width: "100%",
  },
  inputItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: "#c9492f",
    marginBottom: 10,
    backgroundColor: "white",
  },

  forgotPasswordText: {
    fontSize: 14,
    textAlign: "right",
    // marginTop: -10,
    // marginBottom: 10,
  },
  forgotButton: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: -10,
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpSection: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontWeight: "bold",
    marginLeft: 5,
    color: "#99a3a4",
  },
  // New styles for toggle switch
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#99a3a4",
  },
  loginWith: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  loginWithIcons: {
    width: 30,
    height: 30,
  },
});

export default styles;
