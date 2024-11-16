import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import InteractionScreen from './screens/InteractionScreen';
import ChatScreen from './screens/ChatScreen';
import Sidebar from './components/Sidebar';
import { Provider as PaperProvider } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'NCERT Podcaster',
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
      }}
    />
    
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        title: 'Chat',
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const Navigation = () => {
  console.log('Rendering Navigation');
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={() => <Sidebar />}>
          <Drawer.Screen name="Main" component={StackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigation;
