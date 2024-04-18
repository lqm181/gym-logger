package com.gymlogger.backend.service;

import com.gymlogger.backend.model.Workout;

import java.util.List;

public interface WorkoutService {
    Workout addWorkoutToUser(Long userId, Workout workout);

    List<Workout> getAllWorkoutsOfUser(Long userId);

    Workout getWorkoutById(Long id);
}
