package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExerciseSet;

public interface ExerciseSetService {
    void addSetToExercise(ExerciseSet exerciseSet, Long performedExerciseId);
}
