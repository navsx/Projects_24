import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { transcribeAudio, generateSpeech } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const InteractionScreen = () => {
  console.log('InteractionScreen rendered');
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access audio is required');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const audioFile = await recording.getURI();
      const transcript = await transcribeAudio(audioFile);
      setTranscription(transcript);

      const audioUrl = await generateSpeech(transcript);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Failed to stop recording', error);
    } finally {
      setRecording(null);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Interact with NCERT Podcaster</Title>
          <Paragraph>
            {transcription
              ? `Transcription: ${transcription}`
              : 'Tap the button to start recording'}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
          >
            <Text style={styles.buttonText}>
              {recording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      {audioUrl && (
        <Audio.Sound
          source={{ uri: audioUrl }}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setAudioUrl('');
            }
          }}
          style={{ height: 0 }}
          shouldPlay
        />
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  card: {
    width: '80%',
    elevation: 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InteractionScreen;
