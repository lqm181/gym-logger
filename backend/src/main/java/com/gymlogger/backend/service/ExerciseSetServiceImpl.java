package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExercisePerformed;
import com.gymlogger.backend.model.ExerciseSet;
import com.gymlogger.backend.repository.ExercisePerformedRepository;
import com.gymlogger.backend.repository.ExerciseSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseSetServiceImpl implements ExerciseSetService {
    @Autowired
    ExerciseSetRepository exerciseSetRepository;
    @Autowired
    ExercisePerformedRepository exercisePerformedRepository;

    @Override
    public void addSetToExercise(ExerciseSet exerciseSet, Long performedExerciseId) {
        ExercisePerformed exercisePerformedRef = exercisePerformedRepository.getReferenceById(performedExerciseId);

        exerciseSet.setExercisePerformed(exercisePerformedRef);
        exerciseSetRepository.save(exerciseSet);
    }
}
