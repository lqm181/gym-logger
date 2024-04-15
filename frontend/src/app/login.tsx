import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { COLORS, FONTWEIGHT, SIZES } from '../constants';
import { Link } from 'expo-router';
import { EvilIcons, FontAwesome6 } from '@expo/vector-icons';

const login = () => {
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
              <View style={styles.inputRow}>
                <FontAwesome6 name='envelope' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='Email'
                  placeholder='Email'
                  containerStyle={[styles.input]}
                  inputMode='email'
                  style={{ borderWidth: 1 }}
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
                  containerStyle={[styles.input]}
                />
              </View>
            </View>
            <View style={styles.actionContainer}>
              <Button style={styles.button}>Log in</Button>
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
