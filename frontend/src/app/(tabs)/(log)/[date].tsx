import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AddExerciseButton, AddExerciseModal, Button } from '@/src/components';

const LogDetailScreen = () => {
  const { date, id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    /* Dynamically set the title for each log */
    if (navigation) {
      navigation.setOptions({
        title: date,
      });
    }
  }, [navigation, date]);

  return (
    <View>
      <Text>LogDetailScreen for {date}</Text>
      <Button onPress={() => router.back()}>Back</Button>

      <AddExerciseButton />
    </View>
  );
};

export default LogDetailScreen;
