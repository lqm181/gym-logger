import { View, Text } from 'react-native';
import React from 'react';
import { useSession } from '@/src/providers/SessionProvider';
import { isValidJwt } from '@/src/utils/jwtUtils';
import { Redirect, Stack } from 'expo-router';

const _layout = () => {
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(log)' options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
