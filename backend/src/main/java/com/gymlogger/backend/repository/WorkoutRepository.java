package com.gymlogger.backend.repository;

import com.gymlogger.backend.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
