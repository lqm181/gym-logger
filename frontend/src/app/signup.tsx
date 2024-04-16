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
import { useSession } from '../providers/SessionProvider';

const signup = () => {
  const [input, setInput] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
  } | null>();

  const [error, setError] = useState<null | Error>();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, session } = useSession();

  const handleSignup = async () => {
    Keyboard.dismiss();
    try {
      await signUp({
        firstName: input?.firstName ?? '',
        lastName: input?.lastName ?? '',
        email: input?.email ?? '',
        password: input?.password ?? '',
        confirmedPassword: input?.confirmedPassword ?? '',
      });
      setError(null);
      setInput(null);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('signup', session);
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
              {error && <Text style={styles.errorText}>* {error.message}</Text>}
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
