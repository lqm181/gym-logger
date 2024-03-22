import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/constants';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          // headerShown: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name='home-outline' size={28} color={color} />
          ),
          headerLeft: () => <Text>Setting icon</Text>,
          headerRight: () => <Text>User Image</Text>,
        }}
      />
    </Tabs>
  );
}
