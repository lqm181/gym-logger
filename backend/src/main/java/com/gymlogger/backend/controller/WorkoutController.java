package com.gymlogger.backend.controller;

import com.gymlogger.backend.model.Workout;
import com.gymlogger.backend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workouts")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @PostMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Workout createNewWorkout(@PathVariable Long userId, @RequestBody Workout workout) {
        return workoutService.addWorkoutToUser(userId, workout);
    }

    @GetMapping("/users/{userId}")
    public List<Workout> getAllWorkouts(@PathVariable Long userId) {
        return workoutService.getAllWorkoutsOfUser(userId);
    }

    @GetMapping("/{id}")
    public Workout getOneWorkout(@PathVariable Long id) {
        return workoutService.getWorkoutById(id);
    }
}
