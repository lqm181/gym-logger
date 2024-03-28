import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const LogsScreen = () => {
  return (
    <View>
      <Text>Display all logs</Text>
      <Link
        href={{
          pathname: '/(tabs)/(log)/[date]',
          params: { date: '3/27/2024' },
        }}
      >
        3/27/2024
      </Link>
      <Link
        href={{
          pathname: '/(tabs)/(log)/[date]',
          params: { date: '3/26/2024' },
        }}
      >
        3/26/2024
      </Link>
    </View>
  );
};

export default LogsScreen;
