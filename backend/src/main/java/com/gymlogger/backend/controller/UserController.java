package com.gymlogger.backend.controller;

import com.gymlogger.backend.model.User;
import com.gymlogger.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createNewUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("{id}")
    public User getUserInfo(@PathVariable Long id) {
        return userService.getUser(id);
    }
}
