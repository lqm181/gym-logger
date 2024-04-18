package com.gymlogger.backend.repository;

import com.gymlogger.backend.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findAllByUserId(final Long userId);
}
