package com.pocket.pocket.controller;

import com.pocket.pocket.model.*;
import com.pocket.pocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    public UserDetail loginUser(@RequestBody Login user) {
        boolean isValid = service.validatePassword(user.getEmail(), user.getPassword());
        if (isValid) {
            return service.getUserDetail(service.getToken(user.getEmail(), user.getPassword()));
        }
        return null;
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

    @PutMapping("/updateEmail")
    public UpdateUser updateUserEmail(@RequestBody UpdateUser user) {
        return service.updateEmail(user);
    }
    @PutMapping("/updateName")
    public UpdateUser updateUserName(@RequestBody UpdateUser user) {
        return service.updateName(user);
    }

    @PutMapping("/updatePassword")
    public UpdateUser updateUserPassword(@RequestBody UpdateUser user) {
        return service.updatePassword(user);
    }

    @DeleteMapping("/delete/{token}")
    public void deleteUser(@PathVariable String token) {
        service.deleteUser(token);
    }

    @GetMapping("/reports/{id}")
    public List<Report> userReports(@PathVariable int id){
        return service.getReport(id);
    }

    @PutMapping("/updateProfile")
    public UserDetail updateProfile(@RequestBody UserDetail user) {
        return service.updateUser(user);
    }

}
