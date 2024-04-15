import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { BACKEND_API_URL, COLORS, FONTWEIGHT, SIZES } from '../constants';
import { Link } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import useDataFetcher from '../hooks/useDataFetcher';

const signup = () => {
  const [input, setInput] = useState<{
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmedPassword: string | undefined;
  }>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmedPassword: undefined,
  });

  const { isLoading, error, fetchData } = useDataFetcher();
  const [registerError, setRegisterError] = useState<null | Error>();

  // Todo: Add form validation.
  const handleSignup = async () => {
    if (
      !input.firstName ||
      !input.lastName ||
      !input.email ||
      !input.password ||
      !input.confirmedPassword
    ) {
      setRegisterError(new Error('Please enter all information.'));
      return;
    } else if (input.password !== input.confirmedPassword) {
      setRegisterError(new Error('Passwords do not match.'));
      return;
    }

    const userData = await fetchData(`${BACKEND_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        ...input,
      },
    });

    if (userData) {
      // TODO: Add redirection and update user context.
      setRegisterError(null);
    }
  };

  useEffect(() => {
    if (error) {
      setRegisterError(
        new Error('Email already exists. Please use a different email address.')
      );
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
              <Text style={styles.title}>Create Account</Text>
              {/* <Text style={styles.subTitle}>
                Signup to your account to continue.
              </Text> */}
            </View>
            <View style={styles.inputContainer}>
              {registerError && (
                <Text style={styles.errorText}>* {registerError.message}</Text>
              )}
              <View style={styles.inputRow}>
                <FontAwesome6 name='user-large' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='First Name'
                  placeholder='First Name'
                  containerStyle={[styles.input]}
                  style={{ borderWidth: 1 }}
                  value={input?.firstName}
                  onChangeText={(text) =>
                    setInput((prev) => ({ ...prev, firstName: text }))
                  }
                />
                <Input
                  variant='outlined'
                  label='Last Name'
                  placeholder='Last Name'
                  containerStyle={[styles.input]}
                  style={{ borderWidth: 1 }}
                  value={input?.lastName}
                  onChangeText={(text) =>
                    setInput((prev) => ({ ...prev, lastName: text }))
                  }
                />
              </View>
              <View style={styles.inputRow}>
                <FontAwesome6 name='envelope' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='Email'
                  placeholder='Email'
                  containerStyle={[styles.input]}
                  inputMode='email'
                  style={{ borderWidth: 1 }}
                  value={input?.email}
                  onChangeText={(text) =>
                    setInput((prev) => ({ ...prev, email: text }))
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
                  textContentType='newPassword'
                  containerStyle={[styles.input]}
                  value={input?.password}
                  onChangeText={(text) =>
                    setInput((prev) => ({ ...prev, password: text }))
                  }
                />
              </View>
              <View style={styles.inputRow}>
                <FontAwesome6 name='circle-check' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  secureTextEntry={true}
                  textContentType='newPassword'
                  containerStyle={[styles.input]}
                  value={input?.confirmedPassword}
                  onChangeText={(text) =>
                    setInput((prev) => ({ ...prev, confirmedPassword: text }))
                  }
                />
              </View>
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={styles.button}
                disabled={isLoading}
                onPress={handleSignup}
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </Button>
              <Text>
                Already have an account?{' '}
                <Link href='/login' style={styles.link}>
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;

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
  errorText: { color: COLORS.error, marginBottom: 8 },
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
