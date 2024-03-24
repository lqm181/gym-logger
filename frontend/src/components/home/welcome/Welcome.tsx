import { View, Text } from 'react-native';
import React from 'react';
import styles from './welcome.style';
import UserAvatar from '../../common/UserAvatar';
import { COLORS } from '@/src/constants';

const Welcome = () => {
  const user = { firstName: 'John', lastName: 'Doe' };

  return (
    <View style={styles.container}>
      <UserAvatar
        dimension={60}
        image_url={''}
        imageStyle={{
          backgroundColor: COLORS.white,
        }}
      />
      <View style={{ marginLeft: 30 }}>
        <Text style={styles.helloMessage}>Hello, {user.firstName}</Text>
        <Text style={styles.welcomeMessage}>
          Track and organize your workout
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
