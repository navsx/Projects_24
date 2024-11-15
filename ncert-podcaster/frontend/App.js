console.log('App.js Loaded');

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import 'react-native-gesture-handler';

export default function App() {
  console.log('Rendering App');
  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});





