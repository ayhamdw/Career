import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { SIZE } from "../../assets/styles/Dimensions";
import { COLORS } from "../../assets/styles/Dimensions";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    id: 1,
    title: "Welcome to Career",
    description:
      "Career is a platform that connects you with skilled professionals in your area. Whether you need home repairs, cleaning, or other services, Career makes it easy to find trusted workers at your convenience.",
    image: require("../../assets/images/Intro_1.png"),
  },
  {
    id: 2,
    title: "How It Works",
    description:
      "Simply browse through professional profiles, check their ratings and reviews, and request a service. With Career user-friendly interface, finding help has never been easier",
    image: require("../../assets/images/Intro_2.jpg"),
  },
  {
    id: 3,
    title: "Secure and Reliable",
    description:
      "Your safety is our priority. All professionals on Career are verified, and your personal information is kept secure with the latest encryption and authentication methods",
    image: require("../../assets/images/Intro_3.png"),
  },
];

const Introduction2 = () => {
  const navigation = useNavigation();

  const labelButton = (label: string) => {
    return (
      <View style={styles.nextAndSkipButtonViewStyle}>
        <Text style={styles.nextAndSkipButtonStyle}>{label}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.viewStyle}>
            <Image source={item.image} style={styles.imageStyle} />
            <Text style={styles.titleStyle}>{item.title}</Text>
            <Text style={styles.descriptionStyle}>{item.description}</Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: COLORS.activeDot,
        width: 30,
      }}
      showSkipButton
      renderNextButton={() => labelButton("Next")}
      renderSkipButton={() => labelButton("Skip")}
      renderDoneButton={() => labelButton("Done")}
      onDone={() => navigation.navigate("Login")}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: SIZE.width - 80,
    height: 400,
    resizeMode: "contain",
    justifyContent: "center",
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "NotoSerif Condensed-Black",
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 90,
    backgroundColor: "white",
  },
  titleStyle: {
    fontSize: SIZE.h1,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.title,
  },
  descriptionStyle: {
    fontSize: SIZE.h4,
    paddingTop: 10,
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: "Cairo Bold",
  },
  nextAndSkipButtonViewStyle: {
    padding: 12,
  },
  nextAndSkipButtonStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: SIZE.h4,
  },
});

export default Introduction2;
