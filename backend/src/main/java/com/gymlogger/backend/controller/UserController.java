package com.gymlogger.backend.controller;

import com.gymlogger.backend.model.User;
import com.gymlogger.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User add(@RequestBody User user) {

        return userService.saveUser(user);
    }

    @GetMapping("{id}")
    public User get(@PathVariable Long id) {
        return userService.getUser(id);
    }
}
