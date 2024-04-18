import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@/src/constants';
import { BlurView } from 'expo-blur';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='[title]'
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerBackground: () => (
            <BlurView
              intensity={80}
              tint='extraLight'
              style={[StyleSheet.absoluteFill]}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
