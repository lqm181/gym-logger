import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { COLORS, FONTWEIGHT, SIZES } from '../constants';
import { Link } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

const signup = () => {
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
              <View style={styles.inputRow}>
                <FontAwesome6 name='user-large' size={20} color='black' />
                <Input
                  variant='outlined'
                  label='First Name'
                  placeholder='First Name'
                  containerStyle={[styles.input]}
                  style={{ borderWidth: 1 }}
                />
                <Input
                  variant='outlined'
                  label='Last Name'
                  placeholder='Last Name'
                  containerStyle={[styles.input]}
                  style={{ borderWidth: 1 }}
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
                />
              </View>
            </View>
            <View style={styles.actionContainer}>
              <Button style={styles.button}>Sign up</Button>
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
