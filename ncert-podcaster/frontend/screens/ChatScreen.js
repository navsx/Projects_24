import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, Avatar, TextInput, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ChatScreen = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleAudioToggle = () => {
    setIsRecording(!isRecording);
    // Implement audio recording logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={48} icon="account" />
        <Text style={styles.title}>Welcome, User</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Chat" component={ChatTab} />
        <Tab.Screen name="Quiz Mode" component={QuizTab} />
        <Tab.Screen name="Visual Aids" component={VisualTab} />
      </Tab.Navigator>
      <View style={styles.audioContainer}>
        <IconButton
          icon={isRecording ? "microphone-off" : "microphone"}
          color={isRecording ? "red" : "black"}
          size={30}
          onPress={handleAudioToggle}
        />
        <TextInput
          label="Type a message..."
          style={styles.input}
          right={<TextInput.Icon name="send" />}
        />
      </View>
    </SafeAreaView>
  );
};

const ChatTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text>Chat with AI here.</Text>
  </ScrollView>
);

const QuizTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.subTitle}>Practice Quiz</Text>
    <Text>Test your understanding of the chapter here.</Text>
  </ScrollView>
);

const VisualTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.subTitle}>Visual Learning</Text>
    <Text>Interactive diagrams and illustrations.</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    marginLeft: 16,
  },
  tabContent: {
    padding: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    flex: 1,
  },
});

export default ChatScreen;
