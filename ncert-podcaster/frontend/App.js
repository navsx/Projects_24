import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
//import InteractionScreen from './screens/InteractionScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

console.log('Rendering App.js');

// First, create the stack navigator configuration
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'KVS Podcaster',
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        title: 'ChatScreen',
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen 
      name="MainStack" 
      component={MainStack}
      options={{
        headerShown: true  // This hides the drawer header
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainDrawer />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}