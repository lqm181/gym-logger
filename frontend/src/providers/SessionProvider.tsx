import React from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { BACKEND_API_URL } from '../constants';

interface Session {
  token: string;
  userId: number;
  email: string;
}

interface AuthContextProps {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextProps>({
  signIn: async (credentials) => {},
  signUp: async (credentials) => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] =
    useStorageState<Session>('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials) => {
          if (!credentials.email || !credentials.password)
            throw new Error('Please enter valid email and password.');

          const res = await fetch(`${BACKEND_API_URL}/api/auth/authenticate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            if (res.status === 404 || res.status === 500) {
              throw new Error('Something went wrong. Please try again.');
            } else {
              throw new Error('Incorrect email or password.');
            }
          }
          const data = await res.json();
          setSession(data);
        },
        signUp: async (credentials) => {
          const res = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            if (res.status === 404 || res.status === 500) {
              throw new Error('Something went wrong. Please try again.');
            } else {
              throw new Error(
                'Email already exists. Please use a different email address.'
              );
            }
          }
          const data = await res.json();
          setSession(data);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}
