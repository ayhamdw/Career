import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../Chat/Messages";
import ChatUser from "../Chat/ChatUser";
import ChatGroup from "../Chat/ChatGroup";
import GroupDetails from "../Chat/GroupDetails";

const Stack = createNativeStackNavigator();

const MessageNavigator = ({ user }) => {
  const screenData = useMemo(
    () => ({
      Messages: (props: any) => <Messages {...props} user={user} />,
      ChatUser: (props: any) => <ChatUser {...props} user={user} />,
      ChatGroup: (props: any) => <ChatGroup {...props} user={user} />,
      GroupDetails: (props: any) => <GroupDetails {...props} user={user} />,
    }),
    [user]
  );

  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        name="Messages"
        component={screenData.Messages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ChatUser" component={screenData.ChatUser} />
      <Stack.Screen name="ChatGroup" component={screenData.ChatGroup} />
      <Stack.Screen name="GroupDetails" component={screenData.GroupDetails} />
    </Stack.Navigator>
  );
};

export default MessageNavigator;
