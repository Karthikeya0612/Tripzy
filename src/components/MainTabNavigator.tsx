import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Trips from '../screens/Trips';
import Profile from '../screens/Profile';
import TripForm from '../screens/TripForm';
import Icon from './Icon';
import TripDetails from '../screens/TripDetails';
import { StackParamList } from './Types';
import EditTrip from '../screens/EditTrip';
import ManageExpenses from '../screens/ManageExpenses';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

const TripsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Trips">
      <Stack.Screen name="Trips" component={Trips} options={{ title: "Trips" }} />
      <Stack.Screen name="TripDetails" component={TripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="EditTrip" component={EditTrip} options={{ headerShown: false }} />
      <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Form" component={TripForm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, tabBarStyle:
        {
          position: "absolute", // Ensures the tab bar stays fixed at the bottom
          bottom: 0, // Aligns tab bar at the very bottom
          left: 0,
          right: 0,
          height: '6%', // Adjust height as needed
          borderTopEndRadius: 25,
          borderTopStartRadius: 25,

        }
      }} >
      <Tab.Screen
        name="Tripzy"
        component={HomeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
          const hideOnScreens = ['Form'];
          const shouldHideTabBar = hideOnScreens.includes(routeName);
          return {
            tabBarStyle: {
              position: "absolute", // Ensures the tab bar stays fixed at the bottom
              bottom: 0, // Aligns tab bar at the very bottom
              left: 0,
              right: 0,
              height: '6%', // Adjust height as needed
              borderTopEndRadius: 25,
              borderTopStartRadius: 25,
              display: shouldHideTabBar ? 'none' : 'flex',
            },
            tabBarIcon: ({ focused }) => (
              <Icon name="home" color={focused ? "#1c6888" : "#abb7b7"} size={30} />
            ),
            tabBarLabel: () => null,
          };
        }}
      />
      <Tab.Screen
        name="TripStack"
        component={TripsStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Trips';
          const hideOnScreens = ['TripDetails', 'EditTrip', 'ManageExpenses', 'ExpenseDetails'];
          const shouldHideTabBar = hideOnScreens.includes(routeName);

          return {
            tabBarStyle: {
              position: "absolute", // Ensures the tab bar stays fixed at the bottom
              bottom: 0, // Aligns tab bar at the very bottom
              left: 0,
              right: 0,
              height: '6%', // Adjust height as needed
              borderTopEndRadius: 25,
              borderTopStartRadius: 25,
              display: shouldHideTabBar ? 'none' : 'flex',
            },
            tabBarIcon: ({ focused }) => (
              <Icon name="airplane" color={focused ? "#1c6888" : "#abb7b7"} size={30} />
            ),
            tabBarLabel: () => null,
            headerShown: false,
          };
        }}
      />
      < Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="account" color={focused ? "#1c6888" : "#abb7b7"} size={30} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
