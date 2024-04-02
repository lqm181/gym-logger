package com.gymlogger.backend.service;

import com.gymlogger.backend.model.User;
import com.gymlogger.backend.model.Workout;
import com.gymlogger.backend.repository.UserRepository;
import com.gymlogger.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WorkoutServiceImpl implements WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Workout addWorkoutToUser(Long userId, Workout workout) {
        User userRef = userRepository.getReferenceById(userId);

        workout.setUser(userRef);
        return workoutRepository.save(workout);
    }

    @Override
    public List<Workout> getAllWorkoutsOfUser(Long userId) {
        return workoutRepository.findAllByUserId(userId);
    }
}
