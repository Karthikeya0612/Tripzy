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
      <Stack.Screen name="Home" component={Home} options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="Form" component={TripForm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{ headerShown:false, tabBarStyle: 
    { position: "absolute", // Ensures the tab bar stays fixed at the bottom
      bottom: 0, // Aligns tab bar at the very bottom
      left: 0,
      right: 0,
      height: 45, // Adjust height as needed
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,

    } }} >
      <Tab.Screen 
        name="Tripzy" 
        component={HomeStack} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? "#FE724C" : "gray"} size={30} />
          ),
          tabBarLabel: () => null,
        }}  
        
      />
      <Tab.Screen 
        name="TripStack" 
        component={TripsStack} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Icon name="flight" color={focused ? "#FE724C" : "gray"} size={30} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Icon name="person" color={focused ? "#FE724C" : "gray"} size={30} />
          ),
          tabBarLabel: () => null,
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
