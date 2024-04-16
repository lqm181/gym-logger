import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { ReactNode, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { useAppSelector } from '@/src/state/store';
import { selectWorkoutByIndex } from '@/src/state/selectors';
import { Workout } from '@/src/types';
import { useSession } from '@/src/providers/SessionProvider';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { BACKEND_API_URL } from '@/src/constants';

const AddWorkoutButton = ({ children, ...props }: TouchableOpacityProps) => {
  const { session } = useSession();
  const mostCurrentWorkout = useAppSelector((state) =>
    selectWorkoutByIndex(state, 0)
  );
  const { error, securedFetch } = useJwtFetcher<Workout>();
  const router = useRouter();

  const redirectToWorkoutDetail = async () => {
    // If workout for today already exist.
    if (
      mostCurrentWorkout?.created_at &&
      mostCurrentWorkout.created_at >= new Date()
    ) {
      router.push({
        pathname: '/(tabs)/(log)/[title]',
        params: {
          title: mostCurrentWorkout.title,
          workoutId: mostCurrentWorkout.id,
        },
      });
      return;
    }

    // Session does not exist. Error.
    if (!session) {
      console.error('Unable to create new workout. Please try again.');
      return;
    }

    console.log(session);
    const newWorkout = await securedFetch(
      `${BACKEND_API_URL}/workouts/users/${session.userId}`,
      session?.token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title: new Date().toLocaleDateString(),
          created_at: new Date(),
          last_updated: new Date(),
        },
      }
    );
    console.log('newWorkout', newWorkout);
    if (newWorkout) {
      router.push({
        pathname: '/(tabs)/(log)/[title]',
        params: { title: newWorkout.title, workoutId: newWorkout.id },
      });
    }
    return;
  };

  // TODO: Handle error
  return (
    <TouchableOpacity onPress={redirectToWorkoutDetail}>
      {children}
    </TouchableOpacity>
  );
};

export default AddWorkoutButton;
