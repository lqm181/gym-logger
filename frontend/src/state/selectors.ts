import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectWorkouts = (state: RootState) => state.workouts;
export const selectPerformedExercises = (state: RootState) =>
  state.performedExercises;

export const selectWorkoutById = (state: RootState, id: string | number) =>
  state.workouts.byIds[id];

export const selectWorkoutByIndex = (state: RootState, index: number) => {
  // Index out of range.
  if (state.workouts.allIds.length <= index) return null;

  const id = state.workouts.allIds[index];
  return state.workouts.byIds[id];
};

export const selectWorkoutExercises = createSelector(
  [selectPerformedExercises, selectWorkoutById],
  (exercises, workout) => {
    return workout?.performedExerciseIds?.map((id) => exercises.byIds[id]);
  }
);
