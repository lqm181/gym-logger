package com.gymlogger.backend.service;

import com.gymlogger.backend.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public User addUser(User user);

    public User getUser(Long id);
}
