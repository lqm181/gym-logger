package com.gymlogger.backend.service;

import com.gymlogger.backend.model.User;

public interface UserService {
    public User addUser(User user);

    public User getUser(Long id);
}
