import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NormalizedWorkout, WorkoutState } from '../types';

const initialState: WorkoutState = {
  allIds: [],
  byIds: {},
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkouts: (state, action: PayloadAction<NormalizedWorkout[]>) => {
      const workouts = action.payload;
      workouts.map((workout) => {
        const { id } = workout;

        // Avoid duplication
        if (state.byIds[id]) return;

        state.allIds.push(id);
        state.byIds[id] = workout;
      });
    },
    addExerciseId: (
      state,
      action: PayloadAction<{
        exerciseId: string | number;
        workoutId: string | number;
      }>
    ) => {
      const { exerciseId, workoutId: id } = action.payload;

      // Workout not found.
      if (!state.byIds[id]) return;

      // Exercise already in the list
      if (state.byIds[id].performedExerciseIds.includes(exerciseId)) return;

      state.byIds[id].performedExerciseIds.push(exerciseId);
    },
  },
});

export const { addWorkouts, addExerciseId } = workoutSlice.actions;
export default workoutSlice.reducer;
