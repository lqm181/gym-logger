import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ExercisePerformed,
  ExercisePerformedState,
  ExerciseSet,
} from '../types';

const initialState: ExercisePerformedState = {
  allIds: [],
  byIds: {},
};

const exercisePerformedSlice = createSlice({
  name: 'exercisePerformed',
  initialState,
  reducers: {
    addExercises: (state, action: PayloadAction<ExercisePerformed[]>) => {
      const newExercises = action.payload;
      newExercises.map((exercise) => {
        const { id } = exercise;

        // Avoid duplication
        if (state.byIds[id]) return;

        state.allIds.push(id);
        state.byIds[id] = exercise;
      });
    },
    addSet: (
      state,
      action: PayloadAction<{
        newSet: ExerciseSet;
        exerciseId: string | number;
      }>
    ) => {
      const { newSet, exerciseId: id } = action.payload;

      // Ignore if the performed exercise with the id not exist
      if (!state.byIds[id]) return;

      state.byIds[id].exerciseSets.push(newSet);
    },
    deleteSet: (
      state,
      action: PayloadAction<{
        exerciseId: string | number;
        setId: string | number;
      }>
    ) => {
      const { exerciseId, setId } = action.payload;

      if (!state.byIds[exerciseId]) return;

      const newSets = state.byIds[exerciseId].exerciseSets.filter(
        (set) => set.id != setId
      );
      state.byIds[exerciseId].exerciseSets = newSets;
    },
    updateSet: (
      state,
      action: PayloadAction<{
        updatedSet: ExerciseSet;
        exerciseId: string | number;
      }>
    ) => {
      const { updatedSet, exerciseId: id } = action.payload;

      if (!state.byIds[id]) return;

      const newSets = state.byIds[id].exerciseSets.map((set) => {
        if (set.id !== updatedSet.id) return set;

        return updatedSet;
      });

      state.byIds[id].exerciseSets = newSets;
    },
  },
});

export const { addExercises, addSet, deleteSet, updateSet } =
  exercisePerformedSlice.actions;

export default exercisePerformedSlice.reducer;
