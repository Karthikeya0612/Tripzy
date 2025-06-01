import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import MainTabNavigator from './src/components/MainTabNavigator';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // ✅ Only set user if email is verified
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1c6888" />
      </View>
    );
  }
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
