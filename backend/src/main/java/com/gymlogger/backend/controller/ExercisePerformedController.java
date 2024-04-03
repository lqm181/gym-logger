package com.gymlogger.backend.controller;

import com.gymlogger.backend.model.ExercisePerformed;
import com.gymlogger.backend.service.ExercisePerformedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/performed-exercises")
public class ExercisePerformedController {

    @Autowired
    ExercisePerformedService exercisePerformedService;

    @PostMapping("/workouts/{workoutId}")
    @ResponseStatus(HttpStatus.CREATED)
    public String performNewExercise(@RequestBody ExercisePerformed exercisePerformed, @PathVariable Long workoutId) {
        exercisePerformedService.addExerciseToWorkout(exercisePerformed, workoutId);
        return "Performed exercise add success!";
    }
}
