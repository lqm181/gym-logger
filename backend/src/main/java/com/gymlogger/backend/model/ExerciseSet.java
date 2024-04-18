package com.gymlogger.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "exercise_set")
public class ExerciseSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float weight;
    private int reps;
    private LocalDateTime created_at;


    @Column(columnDefinition = "TEXT")
    private String note;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private ExercisePerformed exercisePerformed;

    public ExerciseSet() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public ExercisePerformed getExercisePerformed() {
        return exercisePerformed;
    }

    public void setExercisePerformed(ExercisePerformed exercisePerformed) {
        this.exercisePerformed = exercisePerformed;
    }
}
