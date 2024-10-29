import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { SIZE, COLORS } from "../../assets/styles/Dimensions";
import { useNavigation } from "@react-navigation/native";

import styles from "../../assets/styles/Introduction2Style";
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
        backgroundColor: COLORS.introductionButtonColor,
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

export default Introduction2;
