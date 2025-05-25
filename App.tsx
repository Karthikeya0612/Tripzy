import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import MainTabNavigator from './src/components/MainTabNavigator';
import { StatusBar } from 'expo-status-bar';


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar hidden={true} />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn}  options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
