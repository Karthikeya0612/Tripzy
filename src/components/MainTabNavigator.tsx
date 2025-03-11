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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

const TripsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Trips">
      <Stack.Screen name="Trips" component={Trips} options={{ title: "Trips" }} />
      <Stack.Screen name="TripDetails" component={TripDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="Form" component={TripForm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Tripzy" 
        component={HomeStack} 
        options={{ 
          tabBarIcon: () => (
            <Icon name="home" color="salmon" size={30} />
          ),
          tabBarLabel: () => null,
        }} 
      />
      <Tab.Screen 
        name="TripStack" 
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
