package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExercisePerformed;

public interface ExercisePerformedService {
    void addExerciseToWorkout(ExercisePerformed exercisePerformed, Long workoutId);
}
