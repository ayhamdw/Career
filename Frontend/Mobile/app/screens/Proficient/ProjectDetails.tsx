import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProjectDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params?.project;

  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      ),
    });
  }, [navigation]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSliderContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.imageSlider}
        >
          {project?.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {project?.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{project?.title}</Text>
        <Text style={styles.content}>{project?.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 7,
    marginLeft: 10,

    elevation: 3,
  },
  imageSliderContainer: {
    height: width * 0.6,
  },
  imageSlider: {
    flex: 1,
  },
  image: {
    width: width,
    height: width * 0.6,
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#007bff",
    width: 10,
    height: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#555555",
    textAlign: "justify",
  },
});
