import { View, Text } from 'react-native';
import React from 'react';
import styles from './welcome.style';
import { Image } from 'expo-image';

const Welcome = () => {
  const user = { firstName: 'John', lastName: 'Doe' };

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.helloMessage}>Good morning, {user.firstName}</Text>
      <Text style={styles.welcomeMessage}>Starting tracking your workout</Text>
    </View>
  );
};

export default Welcome;
