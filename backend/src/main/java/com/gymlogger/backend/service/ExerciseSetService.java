package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExerciseSet;

public interface ExerciseSetService {
    ExerciseSet addSetToExercise(ExerciseSet exerciseSet, Long performedExerciseId);

    ExerciseSet updateSetById(ExerciseSet newSet, Long id);
}
