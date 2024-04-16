import { View, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { NormalizedWorkout, Workout } from '@/src/types';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './workoutPreview.style';
import { useAppSelector } from '@/src/state/store';
import { selectWorkoutExercises } from '@/src/state/selectors';

interface WorkoutPreviewProps {
  workoutData: NormalizedWorkout;
}

const WorkoutPreview = ({ workoutData }: WorkoutPreviewProps) => {
  const router = useRouter();
  const performedExercises = useAppSelector((state) =>
    selectWorkoutExercises(state, workoutData.id)
  );

  return (
    <TouchableHighlight
      onPress={() =>
        router.push({
          pathname: '/(tabs)/(log)/[title]',
          params: { title: workoutData.title, workoutId: workoutData.id },
        })
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>{workoutData.title}</Text>

        <View style={styles.content}>
          <View style={styles.exerciseSummary}>
            {performedExercises.length > 0 ? (
              performedExercises.map((performedExercise, index) => {
                return (
                  <Text key={index} style={styles.entryText}>
                    - {performedExercise.exerciseSets.length} set x{' '}
                    {performedExercise.exercise.name}
                  </Text>
                );
              })
            ) : (
              <Text style={styles.noWorkoutText}>
                You have no exercises for this workout.
              </Text>
            )}
          </View>
          <FontAwesome6 name='angle-right' size={20} color='gray' />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default WorkoutPreview;
