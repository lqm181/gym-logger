package com.gymlogger.backend.repository;

import com.gymlogger.backend.model.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Long> {
}
