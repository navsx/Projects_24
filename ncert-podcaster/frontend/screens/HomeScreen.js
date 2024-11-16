import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {
  console.log('Rendering HomeScreen');
  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to KVS Podcaster</Title>
          <Paragraph>
            Explore NCERT textbook content with interactive audio features.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Chat')}
          >
            Ask Query
          </Button>
        </Card.Actions>
      </Card>
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
});

export default HomeScreen;