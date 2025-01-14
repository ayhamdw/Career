import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import FirstTip from "../../../assets/images/FirstTip.jpg";
import SecondTip from "../../../assets/images/SecondTip.jpg";
import ThirdTip from "../../../assets/images/ThirdTip.jpg";
import FourthTip from "../../../assets/images/FourthTip.jpg";
import { Entypo } from "@expo/vector-icons";

export default function Tips() {
  const navigation = useNavigation();
  const animatedValue = new Animated.Value(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [navigation, animatedValue]);

  const tips = [
    {
      id: 1,
      title: "Verify and Communicate",
      description: "Ensure trust with professionals",
      image: FirstTip,
      screen: "FirstTip",
    },
    {
      id: 2,
      title: "Review Profiles",
      description: "Check ratings and experiences",
      image: SecondTip,
      screen: "SecondTip",
    },
    {
      id: 3,
      title: "Clarify Expectations",
      description: "Discuss costs, timelines, and deliverables",
      image: ThirdTip,
      screen: "ThirdTip",
    },
    {
      id: 4,
      title: "Safety First",
      description: "Prioritize your safety during engagements",
      image: FourthTip,
      screen: "FourthTip",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#007BFF", "#00C6FF"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerText}>Tips for a Better Experience</Text>
      </LinearGradient>
      <View style={styles.tipList}>
        {tips.map((tip, index) => {
          const translateY = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50 * (index + 1), 0],
          });

          const opacity = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          return (
            <Animated.View
              key={tip.id}
              style={[
                styles.tipCard,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.cardInner}
                onPress={() => navigation.navigate(tip.screen)}
                activeOpacity={0.9}
              >
                <View style={styles.imageContainer}>
                  <Image source={tip.image} style={styles.tipImage} />
                  <View style={styles.imageOverlay}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
  tipList: {
    gap: 20,
  },
  tipCard: {
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardInner: {
    borderRadius: 15,
  },
  imageContainer: {
    position: "relative",
  },
  tipImage: {
    borderRadius: 15,

    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tipTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tipDescription: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});
