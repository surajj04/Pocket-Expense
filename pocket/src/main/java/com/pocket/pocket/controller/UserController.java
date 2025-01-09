package com.pocket.pocket.controller;

import com.pocket.pocket.model.Login;
import com.pocket.pocket.model.User;
import com.pocket.pocket.model.UserDetail;
import com.pocket.pocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;


    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getAllUsers();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return service.addUser(user);
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody Login user) {
        return service.validatePassword(user.getEmail(), user.getPassword());
    }

    @PostMapping("/token")
    public String getToken(@RequestBody Login user) {
        return service.getToken(user.getEmail(), user.getPassword());
    }

    @PostMapping("/validtoken/{token}")
    public boolean validToken(@PathVariable String token) {
        return service.validateToken(token);
    }

    @PostMapping("/logout/{token}")
    public void logout(@PathVariable String token) {
        service.logoutToken(token);
    }

    @GetMapping("/userDetail/{token}")
    public UserDetail getUserDetail(@PathVariable String token) {
        return service.getUserDetail(token);
    }
}
