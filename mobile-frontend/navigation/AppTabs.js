import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MyEventsScreen } from '../screens/EventsScreen';
import { Home, Calendar, Settings as SettingsIcon } from 'lucide-react-native'; 
import CustomTabBar from '../components/CustomTabBar';
const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let IconComponent;

        switch (route.name) {
          case 'Home':
            IconComponent = Home;
            break;
          case 'Events':
            IconComponent = Calendar;
            break;
          case 'Settings':
            IconComponent = SettingsIcon;
            break;
          default:
            IconComponent = Home; // Default icon
        }

        return <IconComponent size={size} color={color} />;
      },
    })}
  >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Tab.Screen
          name="Events"
          component={MyEventsScreen }
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        /> */}
      </Tab.Navigator>
  );
};
