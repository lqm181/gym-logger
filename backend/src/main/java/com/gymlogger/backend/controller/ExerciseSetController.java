package com.gymlogger.backend.controller;

import com.gymlogger.backend.model.ExerciseSet;
import com.gymlogger.backend.service.ExerciseSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercise-sets")
public class ExerciseSetController {
    @Autowired
    ExerciseSetService exerciseSetService;

    @PostMapping("/performed-exercises/{performedExerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseSet createNewSet(@RequestBody ExerciseSet exerciseSet, @PathVariable Long performedExerciseId) {
        return exerciseSetService.addSetToExercise(exerciseSet, performedExerciseId);
    }

    @PutMapping("/{id}")
    public ExerciseSet updateSet(@RequestBody ExerciseSet newSet, @PathVariable Long id) {
        return exerciseSetService.updateSetById(newSet, id);
    }

    @DeleteMapping("/{id}")
    public void deleteSet(@PathVariable Long id) {
        exerciseSetService.deleteSetById(id);
    }
}
