import { Slot, Stack } from 'expo-router';
import { store } from '../state/store';
import { Provider } from 'react-redux';
import { SessionProvider } from '../providers/SessionProvider';

function AppLayout() {
  const isLoggedIn = false;

  return (
    <Provider store={store}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </Provider>
  );
}

export default AppLayout;
