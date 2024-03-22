import { Stack } from 'expo-router';

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}

export default AppLayout;
