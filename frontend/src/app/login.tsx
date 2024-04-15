import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { BACKEND_API_URL, COLORS, FONTWEIGHT, SIZES } from '../constants';
import { Link } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import useDataFetcher from '../hooks/useDataFetcher';

const login = () => {
  const [credentials, setCredentials] = useState<{
    email: string | undefined;
    password: string | undefined;
  }>({ email: undefined, password: undefined });
  const { isLoading, error, fetchData } = useDataFetcher();
  const [authError, setAuthError] = useState<null | Error>();

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      setAuthError(new Error('Please enter valid username and password.'));
      return;
    }

    Keyboard.dismiss();
    const userData = await fetchData(
      `${BACKEND_API_URL}/api/auth/authenticate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { ...credentials },
      }
    );

    if (userData) {
      // Todo: Add redirection and save user session.
      setAuthError(null);
      console.log(userData);
    }
  };

  useEffect(() => {
    if (error) {
      setAuthError(new Error('Incorrect email or password.'));
    }
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        ignoreIOSKeyboardWillChangeEvents
      >
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subTitle}>
                Login to your account to continue.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              {authError && (
                <Text style={styles.errorText}>* {authError.message}</Text>
              )}
              <View style={styles.inputRow}>
                <FontAwesome6 name='envelope' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='Email'
                  placeholder='Email'
                  containerStyle={[styles.input]}
                  inputMode='email'
                  value={credentials.email}
                  style={{ borderWidth: 1 }}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, email: text }))
                  }
                />
              </View>
              <View style={styles.inputRow}>
                <FontAwesome6 name='lock' size={20} color='black' />

                <Input
                  variant='outlined'
                  label='Password'
                  placeholder='Password'
                  secureTextEntry={true}
                  textContentType='password'
                  value={credentials.password}
                  containerStyle={[styles.input]}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, password: text }))
                  }
                />
              </View>
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in..' : 'Log in'}
              </Button>
              <Text>
                Don't have an account?{' '}
                <Link href='/signup' style={styles.link}>
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 36,
  },
  header: {
    gap: 4,
    marginBottom: 36,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: FONTWEIGHT.bold,
    color: COLORS.primary,
  },
  subTitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  inputContainer: { gap: 16 },
  errorText: { color: COLORS.error, marginBottom: 8 },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: '100%',
  },
  link: {
    color: COLORS.primary,
    fontWeight: FONTWEIGHT.semibold,
  },
});
