import { Workout } from '@/src/types';
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
  },
});

export const { addWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;
