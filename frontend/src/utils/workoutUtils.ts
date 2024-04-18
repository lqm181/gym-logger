import { ExercisePerformed, NormalizedWorkout, Workout } from '../types';

/**
 * Nomalize a list of nested workout data into
 * a list of normalized workouts and normalized exercise performed
 *
 * @param workouts
 */
export const normalizeWorkoutData = (workouts: Workout[]) => {
  const normalizedWorkouts: NormalizedWorkout[] = [];
  const normalizedExercises: ExercisePerformed[] = [];

  // For each workout
  workouts.map((workout) => {
    // Extract the list of ExercisePerformedIds
    // and accummulate all exercises.
    const performedExerciseIds = workout.performedExercises.map(
      (performedExercise) => {
        normalizedExercises.push(performedExercise);
        return performedExercise.id;
      }
    );

    normalizedWorkouts.push({
      id: workout.id,
      title: workout.title,
      created_at: workout.created_at,
      performedExerciseIds,
    });
  });

  return { normalizedWorkouts, normalizedExercises };
};
