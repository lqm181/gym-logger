package com.gymlogger.backend.service;

import com.gymlogger.backend.model.Exercise;

import java.util.List;

public interface ExerciseService {
    Exercise add(Exercise exercise);

    List<Exercise> getAllExercises();
}
