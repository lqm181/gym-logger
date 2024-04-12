import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='[title]'
        options={{
          title: 'Workout Detail',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default _layout;
