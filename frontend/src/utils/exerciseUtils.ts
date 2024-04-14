import { ExercisePerformed, ExerciseSet } from '../types';

export const getTotalVolume = (exercise: ExercisePerformed) => {
  return exercise.exerciseSets.reduce(
    (accum, currentSet) =>
      accum + (currentSet.weight ?? 0) * (currentSet.reps ?? 0),
    0
  );
};

export const isValidSet = (exerciseSet: ExerciseSet) => {
  return (
    exerciseSet &&
    exerciseSet.weight &&
    exerciseSet.reps &&
    exerciseSet.weight > 0 &&
    exerciseSet.weight > 0
  );
};

// export const normalizeExercisePerformed = (
//   exercisePerformed: ExercisePerformed,
//   workoutId: string | number
// ): NormalizedExercisePerformed => {
//   return {
//     id: exercisePerformed.id,
//     exercise: exercisePerformed.exercise,
//     exerciseSets: exercisePerformed.exerciseSets,
//     workoutId: workoutId,
//   };
// };
