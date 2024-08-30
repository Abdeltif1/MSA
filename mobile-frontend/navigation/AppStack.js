import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Event from "../screens/Event";
import { AppTabs } from "./AppTabs";
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Main" component={AppTabs} options={{headerShown:false}} />
      <Stack.Screen name="Event" component={Event} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};
