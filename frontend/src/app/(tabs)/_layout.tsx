import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '@/src/constants';
import { AddWorkoutButton, IconButton, UserAvatar } from '@/src/components';
import { useSession } from '@/src/providers/SessionProvider';
import { Text } from 'react-native';
import { isValidJwt } from '@/src/utils/jwtUtils';

export default function Layout() {
  const { session, isLoading, signOut } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session || !isValidJwt(session.token)) {
    // If the user has not signed in (not session)
    // or if the token expired, then redirect to sign in page.
    signOut();
    return <Redirect href='/welcome' />;
  }

  return (
    <Tabs initialRouteName='index' backBehavior='history'>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} />
          ),
          headerLeft: () => (
            <IconButton size={40}>
              <FontAwesome6 name='bars' size={24} color='#0091FF' />
            </IconButton>
          ),
          headerLeftContainerStyle: {
            paddingLeft: SIZES.small,
          },
          headerRight: () => (
            <IconButton
              size={40}
              buttonStyle={{
                backgroundColor: COLORS.white,
              }}
            >
              <UserAvatar image_url={''} dimension={40} color='#0091FF' />
            </IconButton>
          ),
          headerRightContainerStyle: {
            paddingRight: SIZES.small,
          },
        }}
      />
      <Tabs.Screen
        name='logs'
        options={{
          title: 'Logs',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='(log)'
        options={{
          title: 'New Workout',
          headerShown: false,
          tabBarButton: ({ onPress, ...props }) => (
            <AddWorkoutButton {...props} />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='add-circle-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='routine'
        options={{
          title: 'Routine',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='edit-calendar' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name='user' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='add_exercise'
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
