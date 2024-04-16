import { ScrollView, View } from 'react-native';
import { Welcome } from '../../components';
import { BACKEND_API_URL, COLORS, SIZES } from '@/src/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '@/src/providers/SessionProvider';
import { useEffect } from 'react';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { normalizeWorkoutData } from '@/src/utils/workoutUtils';
import { Workout } from '@/src/types';
import { addExercises } from '@/src/state/performedExerciseSlice';
import { addWorkouts } from '@/src/state/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/src/state/store';
import { selectWorkouts } from '@/src/state/selectors';

export default function Home() {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { data, isLoading, error, securedFetch } = useJwtFetcher<Workout[]>();
  const workouts = useAppSelector((state) => selectWorkouts(state));

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (session) {
        await securedFetch(
          `${BACKEND_API_URL}/workouts/users/${session.userId}`,
          session.token
        );
      }
    };

    fetchWorkouts();
  }, [session]);

  useEffect(() => {
    if (data) {
      const { normalizedWorkouts, normalizedExercises } =
        normalizeWorkoutData(data);
      dispatch(addWorkouts(normalizedWorkouts));
      dispatch(addExercises(normalizedExercises));
    }
  }, [data]);
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
