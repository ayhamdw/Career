import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Man1 from "../../assets/images/Messages/Man1.png";
import Man2 from "../../assets/images/Messages/Man2.png";
import Man3 from "../../assets/images/Messages/Man3.png";

const Messages = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.chatTextStyle}>Chat</Text>
      <StatusBar backgroundColor={"red"} />
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          onPress={() => console.log("Chat 1")}
          style={styles.messageContainer}
        >
          <Image source={Man1} style={styles.imageStyle} />
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.numberOfMessages}>+7</Text>
            </View>
            <Text style={styles.messageText}>
              Hey there, I'm interested in your...
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Chat 2")}
          style={styles.messageContainer}
        >
          <Image source={Man2} style={styles.imageStyle} />
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.numberOfMessages}>+3</Text>
            </View>
            <Text style={styles.messageText}>Can we schedule a meeting?</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Chat 3")}
          style={styles.messageContainer}
        >
          <Image source={Man3} style={styles.imageStyle} />
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.numberOfMessages}>+5</Text>
            </View>
            <Text style={styles.messageText}>
              Let me know if you're available.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Chat 4")}
          style={styles.messageContainer}
        >
          <Image source={Man1} style={styles.imageStyle} />
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.numberOfMessages}>+2</Text>
            </View>
            <Text style={styles.messageText}>
              Follow up on the last meeting.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Chat 5")}
          style={styles.messageContainer}
        >
          <Image source={Man2} style={styles.imageStyle} />
          <View style={styles.messageBubble}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.messageText}>
              Would love to hear back from you soon.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 15,
  },
  chatTextStyle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
  },
  messageBubble: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  numberOfMessages: {
    backgroundColor: "#58d68d",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    minWidth: 35,
    lineHeight: 18,
  },
  messageText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
});
