import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { SafeAreaProvider } from "react-native-safe-area-context";


export const RootNavigator = () => {



  return (
    <SafeAreaProvider>
    <NavigationContainer>
     <AppStack />
    </NavigationContainer>
    </SafeAreaProvider>
  );
};
