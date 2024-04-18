import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/state/store';
import { selectWorkoutByIndex } from '@/src/state/selectors';
import { Workout } from '@/src/types';
import { useSession } from '@/src/providers/SessionProvider';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { BACKEND_API_URL } from '@/src/constants';
import { addWorkouts } from '@/src/state/workoutSlice';
import { isAfterToday } from '@/src/utils/dateUtils';

const AddWorkoutButton = ({ children, ...props }: TouchableOpacityProps) => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const mostCurrentWorkout = useAppSelector((state) =>
    selectWorkoutByIndex(state, 0)
  );
  const { error, securedFetch } = useJwtFetcher<Workout>();
  const router = useRouter();

  const redirectToWorkoutDetail = async () => {
    // If workout for today already exist.
    if (
      mostCurrentWorkout?.created_at &&
      isAfterToday(mostCurrentWorkout.created_at)
    ) {
      router.push({
        pathname: '/(authenticated)/(log)/[title]',
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

    const newWorkout = await securedFetch(
      `${BACKEND_API_URL}/workouts/users/${session.userId}`,
      session?.accessToken,
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
    if (newWorkout) {
      // Add new workout to the global state
      dispatch(
        addWorkouts([
          {
            id: newWorkout.id,
            created_at: newWorkout.created_at,
            title: newWorkout.title,
            performedExerciseIds: [],
          },
        ])
      );

      // Redirect to workout detail page
      router.push({
        pathname: '/(authenticated)/(log)/[title]',
        params: { title: newWorkout.title, workoutId: newWorkout.id },
      });
    }
    return;
  };

  // TODO: Handle error
  return (
    <TouchableOpacity onPress={redirectToWorkoutDetail} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default AddWorkoutButton;
