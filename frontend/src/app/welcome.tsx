import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTWEIGHT, SIZES } from '../constants';
import { useRouter } from 'expo-router';

const welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>GymTrack</Text>
        <Text style={styles.subHeader}>
          Unlock your full potential at the gym by tracking your workouts.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableHighlight
          onPress={() => {
            router.replace('/login');
          }}
          style={[styles.buttonContainer]}
        >
          <View
            style={[
              styles.button,
              { backgroundColor: COLORS.lightWhite, borderColor: 'lightblue' },
            ]}
          >
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>
              Log in
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            router.replace('/signup');
          }}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: COLORS.lightWhite }]}>
              Sign up
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    backgroundColor: COLORS.lightWhite,
    paddingBottom: 24,
  },
  headerContainer: { marginBottom: 36 },
  header: {
    color: COLORS.primary,
    fontWeight: FONTWEIGHT.bold,
    fontSize: SIZES.xxLarge,
    marginBottom: 4,
  },
  subHeader: { fontSize: SIZES.medium, color: COLORS.gray },
  footer: { display: 'flex', flexDirection: 'column', gap: 8 },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: SIZES.medium,
    fontWeight: FONTWEIGHT.semibold,
  },
});
