import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AddExerciseButton, AddExerciseModal, Button } from '@/src/components';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { BACKEND_API_URL, COLORS } from '@/src/constants';
import { FlashList } from '@shopify/flash-list';
import { ExercisePerformed, Workout } from '@/src/types';
import ExerciseCard from '@/src/components/exercise/card/ExerciseCard';

const LogDetailScreen = () => {
  const { title, id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { data, isLoading, error, fetchData } = useDataFetcher<Workout>();

  useEffect(() => {
    /* Dynamically set the title for each log */
    // TODO: Fetch workout information
    if (navigation) {
      navigation.setOptions({
        title: title,
      });
    }
    fetchData(`${BACKEND_API_URL}/workouts/${id}`);
  }, [navigation, title]);

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightWhite,
      }}
    >
      {data && data.performedExercises.length > 0 ? (
        <View style={{ minHeight: 10, paddingHorizontal: 8 }}>
          <FlashList
            data={data?.performedExercises}
            renderItem={({ item }: { item: ExercisePerformed }) => (
              <ExerciseCard data={item} />
            )}
            estimatedItemSize={20}
          />
        </View>
      ) : (
        <Text>Start your workout with an exercise.</Text>
      )}

      <Button onPress={() => router.back()}>Back</Button>

      <AddExerciseButton />
    </ScrollView>
  );
};

export default LogDetailScreen;
