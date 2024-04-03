package com.gymlogger.backend.service;

import com.gymlogger.backend.model.Exercise;
import com.gymlogger.backend.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseServiceImpl implements ExerciseService {
    @Autowired
    ExerciseRepository exerciseRepository;

    @Override
    public Exercise add(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }
}
