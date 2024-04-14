import { Stack } from 'expo-router';
import { store } from '../state/store';
import { Provider } from 'react-redux';

function AppLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

export default AppLayout;
