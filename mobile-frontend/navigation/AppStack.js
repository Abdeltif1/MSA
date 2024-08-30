import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens";
import { AppTabs } from "./AppTabs";
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Main" component={AppTabs} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};
