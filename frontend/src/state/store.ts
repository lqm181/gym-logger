import { configureStore } from '@reduxjs/toolkit';
import performedExerciseSlice from './performedExerciseSlice';
import workoutSlice from './workoutSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    workouts: workoutSlice,
    performedExercises: performedExerciseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
