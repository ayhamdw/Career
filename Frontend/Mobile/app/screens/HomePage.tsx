import Header from "@/components/HomePage/Header";
import SearchBar from "@/components/HomePage/SearchBar";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import TipsHeader from "@/components/HomePage/TipsHeader";
import TipsImage from "@/components/HomePage/TipsImage";
import ProfRecommendation from "@/components/HomePage/ProfRecommendation";
import ProfList from "@/components/HomePage/ProfScrollView";
import styles from "@/assets/styles/HomePage/HomePage";
const HomePage = () => {
  const [search, setSearch] = React.useState<string>("");
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("All Proficient");
  const filters = [
    "All Proficient",
    "Software Engineer",
    "Data Scientist",
    "Doctor",
    "Teacher",
    "Marketing Specialist",
    "Graphic Designer",
    "Accountant",
    "Writer",
    "Sales Manager",
    "Project Manager",
    "Designer",
    "Finance Manager",
    "Engineer",
    "Content Creator",
  ];

  const handleCardPress = (job: {
    name: string;
    title: string;
    proficientType: string;
    place: string;
  }) => {
    console.log(job);
  };

  const jobs = [
    {
      name: "Ahmed Saleh",
      title: "Fix a leaking pipe",
      proficientType: "Plumber",
      place: "Qalqilya, Palestine",
    },
    {
      name: "Laila Hassan",
      title: "Install a new ceiling fan",
      proficientType: "Electrician",
      place: "Nablus, Palestine",
    },
  ];

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header name="Ayham Omar" />

        <SearchBar
          placeholder="Search for jobs"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.tipsSection}>
          <TipsHeader title="Tips For You" buttonText="See All" />
          <TipsImage />
        </View>

        <View style={styles.proficientRecommendationStyle}>
          <TipsHeader title="Proficient Recommendation" buttonText="See All" />
          <ProfRecommendation
            data={filters}
            selectedFilter={selectedFilter}
            onPress={handleFilterPress}
          />
        </View>
        <View style={styles.container}>
          <ProfList jobs={jobs} onCardPress={handleCardPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
