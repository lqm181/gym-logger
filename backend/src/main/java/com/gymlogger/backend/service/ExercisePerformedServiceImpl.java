package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExercisePerformed;
import com.gymlogger.backend.model.ExerciseSet;
import com.gymlogger.backend.model.Workout;
import com.gymlogger.backend.repository.ExercisePerformedRepository;
import com.gymlogger.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExercisePerformedServiceImpl implements ExercisePerformedService {
    @Autowired
    ExercisePerformedRepository exercisePerformedRepository;
    @Autowired
    WorkoutRepository workoutRepository;

    @Override
    public void addExerciseToWorkout(ExercisePerformed exercisePerformed, Long workoutId) {
        Workout workoutRef = workoutRepository.getReferenceById(workoutId);

        exercisePerformed.setWorkout(workoutRef);
        for (ExerciseSet exerciseSet : exercisePerformed.getExerciseSets()) {
            if (exerciseSet.getExercisePerformed() == null) {
                exerciseSet.setExercisePerformed(exercisePerformed);
            }
        }

        exercisePerformedRepository.save(exercisePerformed);
    }
}
