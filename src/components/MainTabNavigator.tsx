import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Trips from '../screens/Trips';
import Profile from '../screens/Profile';
import Icon from './Icon';
import TripDetails from '../screens/TripDetails';
import { StackParamList } from './Types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

const TripsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TripsList" component={Trips} options={{ title: "Trips" }} />
      <Stack.Screen name="TripDetails" component={TripDetails}  />
    </Stack.Navigator>
  );
};
const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          tabBarIcon: () => (
            <Icon name="home" color="salmon" size={30} />
          ),
          tabBarLabel: () => null,
        }} 
      />
      <Tab.Screen 
        name="Trips" 
        component={TripsStack} 
        options={{ 
          tabBarIcon: () => (
            <Icon name="flight" color="salmon" size={30} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          tabBarIcon: () => (
            <Icon name="person" color="salmon" size={30} />
          ),
          tabBarLabel: () => null,
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
