package com.gymlogger.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Workout {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private LocalDateTime created_at;

    private LocalDateTime last_updated;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    private List<ExercisePerformed> performedExercises;

    public Workout() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(LocalDateTime last_updated) {
        this.last_updated = last_updated;
    }

    public List<ExercisePerformed> getPerformedExercises() {
        return performedExercises;
    }

    public void setPerformedExercises(List<ExercisePerformed> performedExercises) {
        this.performedExercises = performedExercises;
    }
}
