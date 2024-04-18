package com.gymlogger.backend.repository;

import com.gymlogger.backend.model.ExercisePerformed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExercisePerformedRepository extends JpaRepository<ExercisePerformed, Long> {
}
