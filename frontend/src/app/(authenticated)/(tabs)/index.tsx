import { ScrollView, View } from 'react-native';
import { Welcome } from '@/src/components';
import { BACKEND_API_URL, COLORS, SIZES } from '@/src/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '@/src/providers/SessionProvider';
import { useEffect } from 'react';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { normalizeWorkoutData } from '@/src/utils/workoutUtils';
import { User, Workout } from '@/src/types';
import { addExercises } from '@/src/state/performedExerciseSlice';
import { addWorkouts } from '@/src/state/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/src/state/store';
import { selectWorkouts } from '@/src/state/selectors';
import { addUser } from '@/src/state/userSlice';

export default function Home() {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { isLoading, error, securedFetch } = useJwtFetcher();
  const workouts = useAppSelector((state) => selectWorkouts(state));

  const fetchWorkouts = async () => {
    if (!session) return;

    const workoutData = (await securedFetch(
      `${BACKEND_API_URL}/workouts/users/${session.userId}`,
      session.accessToken
    )) as Workout[];

    if (workoutData) {
      const { normalizedWorkouts, normalizedExercises } =
        normalizeWorkoutData(workoutData);
      dispatch(addWorkouts(normalizedWorkouts));
      dispatch(addExercises(normalizedExercises));
    }
  };

  const fetchUser = async () => {
    if (!session) return;

    const userData = (await securedFetch(
      `${BACKEND_API_URL}/users/${session.userId}`,
      session.accessToken,
      { method: 'GET' }
    )) as User;

    if (userData) {
      dispatch(addUser(userData));
    }
  };

  useEffect(() => {
    fetchWorkouts();
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={{
            padding: SIZES.medium,
          }}
        >
          <Welcome />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
