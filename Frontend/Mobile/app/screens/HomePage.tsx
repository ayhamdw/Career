import Header from "@/components/HomePage/Header";
import SearchBar from "@/components/HomePage/SearchBar";
import React from "react";
import tips from "@/assets/images/tips.jpg";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import TipsText from "@/components/HomePage/TipsHeader";
import TipsHeader from "@/components/HomePage/TipsHeader";

const HomePage = () => {
  const [search, setSearch] = React.useState<string>("");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header name="Ayham Omar" />

        <SearchBar
          placeholder="Search for jobs"
          value={search}
          onChangeText={setSearch}
        />

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <TipsHeader text="See All" />
          <TouchableOpacity style={styles.tipButton}>
            <Image style={styles.tipImage} source={tips} />
            <View style={styles.tipOverlay}>
              <Text style={styles.tipButtonText}>Discover More</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Job Recommendation Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
        >
          {["All Job", "Writer", "Design", "Finance"].map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Job Listings */}
        <ScrollView style={styles.jobList}>
          {[
            { title: "UI/UX Designer", company: "Adobe", salary: "$3,200" },
            {
              title: "Financial Planner",
              company: "Twitter",
              salary: "$3,400",
            },
          ].map((job, index) => (
            <View key={index} style={styles.jobCard}>
              <View>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <Text style={styles.jobSalary}>{job.salary}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  tipsSection: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
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
  tipsHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  filters: {
    marginTop: 20,
  },
  filterChip: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: "#000",
  },
  jobList: {
    marginTop: 20,
  },
  jobCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobCompany: {
    color: "#888",
  },
  jobSalary: {
    fontSize: 16,
    color: "#58d68d",
  },
});

export default HomePage;
