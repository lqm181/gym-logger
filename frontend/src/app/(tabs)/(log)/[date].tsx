import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AddExerciseButton, AddExerciseModal, Button } from '@/src/components';

const LogDetailScreen = () => {
  const { date } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View>
      <Text>LogDetailScreen for {date}</Text>
      <Button onPress={() => router.back()}>Back</Button>

      <AddExerciseButton />
    </View>
  );
};

export default LogDetailScreen;
