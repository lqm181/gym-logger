import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action], // reducer for setting loading to false and update.
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync<T>(key: string, value: T | null) {
  const serializedValue = value === null ? null : JSON.stringify(value);

  if (Platform.OS === 'web') {
    try {
      if (serializedValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializedValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (serializedValue == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, serializedValue);
    }
  }
}

export function useStorageState<T>(key: string): UseStateHook<T> {
  // Public
  const [state, setState] = useAsyncState<T>();

  // Get
  React.useEffect(() => {
    const loadStorageValue = async () => {
      let storedValue = null;

      // Try loading from localstorage
      if (Platform.OS === 'web') {
        try {
          const item = localStorage.getItem(key);
          storedValue = item ? JSON.parse(item) : null;
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        // Load from expo store
        try {
          const item = await SecureStore.getItemAsync(key);
          storedValue = item ? JSON.parse(item) : null;
        } catch (e) {
          console.error('Secure storage access failed:', e);
        }
      }

      setState(storedValue);
    };

    loadStorageValue();
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
