import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../Messages";
import ChatUser from "../ChatUser";
import ChatGroup from "../ChatGroup";

const Stack = createNativeStackNavigator();

const MessageNavigator = ({ user }) => {
  const screenData = useMemo(
    () => ({
      Messages: (props) => <Messages {...props} user={user} />,
      ChatUser: (props) => <ChatUser {...props} user={user} />,
      ChatGroup: (props) => <ChatGroup {...props} user={user} />,
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
    </Stack.Navigator>
  );
};

export default MessageNavigator;
