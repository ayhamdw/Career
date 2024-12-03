import { View, Text, Image } from "react-native";
import React from "react";
import styles from "@/assets/styles/ProficientPage/ProfStyle";

interface Reviews {
  data: Date;
  rating: number;
  review: string;
  reviewer: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      profileImage: string;
    };
  };
}

interface ReviewSectionProps {
  reviews: Reviews[];
}

const ReviewsSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <View style={styles.profileSection}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <Image
            source={{ uri: review.reviewer.profile.profileImage }}
            style={styles.reviewerImage}
          />
          <View style={styles.reviewContent}>
            <Text style={styles.reviewerName}>
              {review.reviewer.profile.firstName}{" "}
              {review.reviewer.profile.lastName}
            </Text>
            <Text style={styles.rating}>⭐ {review.rating.toFixed(1)}</Text>
            <Text style={styles.reviewText}>{review.review}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ReviewsSection;
