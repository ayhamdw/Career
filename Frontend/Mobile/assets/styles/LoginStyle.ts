import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Kavoon-Regular",
  },
  signInText: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 8,
    color: "#99a3a4",
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "white",
    borderWidth: 1,
  },
  forgotPasswordText: {
    fontSize: 14,
    textAlign: "right",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: "#58d68d",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    height: 50,
    justifyContent: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInWith: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    color: "#99a3a4",
    fontSize: 16,
    fontWeight: "500",
  },
  continueWith: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: "90%",
  },
  continueWithContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  loginWithIcons: {
    width: 25,
    height: 25,
  },
  signUpSection: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontWeight: "bold",
    marginLeft: 5,
    color: "#99a3a4",
  },
});

export default styles;
