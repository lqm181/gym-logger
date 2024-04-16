package com.gymlogger.backend.service;

import com.gymlogger.backend.model.Exercise;
import com.gymlogger.backend.model.ExercisePerformed;
import com.gymlogger.backend.model.ExerciseSet;
import com.gymlogger.backend.model.Workout;
import com.gymlogger.backend.repository.ExercisePerformedRepository;
import com.gymlogger.backend.repository.ExerciseRepository;
import com.gymlogger.backend.repository.WorkoutRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExercisePerformedServiceImpl implements ExercisePerformedService {
    @Autowired
    ExercisePerformedRepository exercisePerformedRepository;
    @Autowired
    WorkoutRepository workoutRepository;

    @Override
    @Transactional
    public ExercisePerformed addExerciseToWorkout(ExercisePerformed exercisePerformed, Long workoutId) {
        Workout workoutRef = workoutRepository.getReferenceById(workoutId);

        exercisePerformed.setWorkout(workoutRef);
        for (ExerciseSet exerciseSet : exercisePerformed.getExerciseSets()) {
            if (exerciseSet.getExercisePerformed() == null) {
                exerciseSet.setExercisePerformed(exercisePerformed);
            }
        }

        return exercisePerformedRepository.save(exercisePerformed);
    }
}
