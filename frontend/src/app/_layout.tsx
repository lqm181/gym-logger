import { Slot, Stack } from 'expo-router';
import { store } from '../state/store';
import { Provider } from 'react-redux';

function AppLayout() {
  const isLoggedIn = false;

  return (
    <Provider store={store}>
      {/* {isLoggedIn ? (
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='login' options={{ headerShown: false }} />
          <Stack.Screen name='signup' options={{ headerShown: false }} />
        </Stack>
      )} */}
      <Slot />
    </Provider>
  );
}

export default AppLayout;
