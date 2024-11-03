import React from "react";
import {
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

import styles from "../../assets/styles/MessagesStyle";

const Messages = ({ user }) => {
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
              <Text style={styles.userName}>{user.firstName}</Text>
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
