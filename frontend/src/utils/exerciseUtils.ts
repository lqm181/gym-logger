import { ExercisePerformed } from '../types';

export const getTotalVolume = (exercise: ExercisePerformed) => {
  return exercise.exerciseSets.reduce(
    (accum, currentSet) =>
      accum + (currentSet.weight ?? 0) * (currentSet.reps ?? 0),
    0
  );
};
