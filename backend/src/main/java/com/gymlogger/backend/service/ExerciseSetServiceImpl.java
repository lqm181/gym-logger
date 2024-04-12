package com.gymlogger.backend.service;

import com.gymlogger.backend.model.ExercisePerformed;
import com.gymlogger.backend.model.ExerciseSet;
import com.gymlogger.backend.repository.ExercisePerformedRepository;
import com.gymlogger.backend.repository.ExerciseSetRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseSetServiceImpl implements ExerciseSetService {
    @Autowired
    ExerciseSetRepository exerciseSetRepository;
    @Autowired
    ExercisePerformedRepository exercisePerformedRepository;

    @Override
    public ExerciseSet addSetToExercise(ExerciseSet exerciseSet, Long performedExerciseId) {
        ExercisePerformed exercisePerformedRef = exercisePerformedRepository.getReferenceById(performedExerciseId);

        exerciseSet.setExercisePerformed(exercisePerformedRef);
        return exerciseSetRepository.save(exerciseSet);
    }

    @Override
    public ExerciseSet updateSetById(ExerciseSet newSet, Long id) {
        ExerciseSet exerciseSet = exerciseSetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("ExerciseSet with id %d was not found", id)
                ));

        if (newSet.getWeight() > 0) {
            exerciseSet.setWeight(newSet.getWeight());
        }
        if (newSet.getReps() > 0) {
            exerciseSet.setReps(newSet.getReps());
        }
        exerciseSet.setNote(newSet.getNote());

        return exerciseSetRepository.save(exerciseSet);
    }

    @Override
    public void deleteSetById(Long id) {
        exerciseSetRepository.deleteById(id);
    }
}
