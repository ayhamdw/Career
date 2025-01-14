import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function GroupDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const group = route.params?.group;
  console.log("Group ID:", group._id);
  console.log("Group Name:", group.groupName);
  const [users, setUsers] = useState([]);
  const [chatName, setChatName] = useState(group.groupName);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/community/getGroupChatUsers/${group._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching group chat users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${ayhamWifiUrl}/api/community/deleteGroupChatUser/${groupId}/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "User deleted",
          text2: "User has been removed from the group.",
        });
        fetchUsers();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete user.",
      });
      Alert.alert("Error", "Failed to delete user.");
      console.error("Error deleting user:", error);
    }
  };

  const saveChanges = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${ayhamWifiUrl}/api/community/updateGroupName/${groupId}`,
        { name: groupName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Group name updated successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update group name.");
      console.error("Error updating group name:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image
        source={{ uri: item.profile.profileImage }}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>
        {item.profile.firstName} {item.profile.lastName}
      </Text>
      <TouchableOpacity onPress={() => deleteUser(item._id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Group Details</Text>
      <TextInput
        style={styles.input}
        value={chatName}
        onChangeText={setChatName}
        placeholder="Enter Group Name"
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.userList}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.loadingText}>Loading users...</Text>
          ) : (
            <Text style={styles.loadingText}>No users in this group.</Text>
          )
        }
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  userList: { paddingBottom: 16 },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  userName: { flex: 1, fontSize: 16 },
  loadingText: { textAlign: "center", marginVertical: 16, color: "#888" },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    bottom: 50,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
