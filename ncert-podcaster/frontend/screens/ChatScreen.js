import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, Avatar, TextInput, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getResponseFromHuggingFace } from '../utils/huggingFace';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [isRecording, setIsRecording] = useState(false); // Audio recording toggle
  const [userQuery, setUserQuery] = useState(''); // Store user input

  // Handle text-based queries
  const handleQuery = async (query) => {
    if (!query.trim()) return; // Prevent empty queries
    console.log('User Query:', query);

    // Add user query to the messages list
    setMessages((prev) => [...prev, { text: query, sender: 'user' }]);
    setUserQuery(''); // Clear input after sending

    try {
      const response = await getResponseFromHuggingFace(query);
      console.log('Response from Hugging Face:', response);
      
      const chatbotResponse = response[0]?.generated_text || 'Sorry, I couldn’t understand that.';
      // Add chatbot response to the messages list
      setMessages((prev) => [...prev, { text: chatbotResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching from Hugging Face:', error);
      setMessages((prev) => [...prev, { text: 'Error: Unable to fetch response.', sender: 'bot' }]);
    }
  };

  // Handle audio recording toggle (to implement actual STT processing)
  const handleAudioToggle = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? 'Recording stopped' : 'Recording started');
  };

  // ChatTab - Display messages
  const ChatTab = () => (
    <ScrollView style={styles.scrollView}>
      {messages.map((msg, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            msg.sender === 'user' ? styles.userMessage : styles.botMessage,
          ]}
        >
          <Text style={styles.messageText}>{msg.text}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Icon size={48} icon="account" />
        <Text style={styles.title}>Welcome, User</Text>
      </View>

      {/* Chat Messages */}
      <ChatTab />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <IconButton
          icon={isRecording ? 'microphone-off' : 'microphone'}
          color={isRecording ? 'red' : 'grey'}
          size={30}
          onPress={handleAudioToggle}
        />
        <TextInput
          label="Type a message..."
          value={userQuery}
          onChangeText={(text) => setUserQuery(text)}
          style={styles.input}
          right={
            <TextInput.Icon
              name="send"
              onPress={() => {
                handleQuery(userQuery); // Send query when "send" is pressed
              }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

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
