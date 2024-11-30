import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Prof {
  name: string;
  title: string;
  proficientType: string;
  place: string;
}

interface ProfListProps {
  jobs: Prof[];
  onCardPress: (job: Prof) => void;
}

const ProfList: React.FC<ProfListProps> = ({ jobs, onCardPress }) => {
  return (
    <ScrollView style={styles.jobList}>
      {jobs.map((job, index) => (
        <TouchableOpacity
          key={index}
          style={styles.jobCard}
          onPress={() => onCardPress(job)}
        >
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.profName}>{job.name}</Text>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobProficient}>🔧 {job.proficientType}</Text>
              <Text style={styles.jobPlace}>📍 {job.place}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  jobList: {
    marginTop: 10,
    flex: 1,
  },
  jobCard: {
    backgroundColor: "#eafaf1",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58d68d",
    width: "100%",
  },
  cardContent: {
    flex: 1,
  },
  profName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  jobProficient: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },
  jobPlace: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});

export default ProfList;
