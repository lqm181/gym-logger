import { Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '@/src/constants';
import { IconButton, UserAvatar } from '@/src/components';

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
          headerRight: () => (
            <IconButton size={40}>
              <UserAvatar image_url={''} dimension={40} color='#0091FF' />
            </IconButton>
          ),
          headerRightContainerStyle: {
            paddingRight: SIZES.small,
          },
          headerLeftContainerStyle: {
            paddingLeft: SIZES.small,
          },
        }}
      />
    </Tabs>
  );
}
