package com.pocket.pocket.service;

import com.pocket.pocket.model.User;
import com.pocket.pocket.model.UserDetail;
import com.pocket.pocket.repository.BudgetRepo;
import com.pocket.pocket.repository.ExpenseRepo;
import com.pocket.pocket.repository.GoalsRepo;
import com.pocket.pocket.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BudgetRepo budgetRepo;
    @Autowired
    private ExpenseRepo expenseRepo;
    @Autowired
    private GoalsRepo goalsRepo;

    @Autowired
    private PasswordEncoder encoder;

    private static String generateToken() {
        return UUID.randomUUID().toString();
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        String encryptedPassword = encoder.encode(user.getPassword());
        String token = generateToken();

        if (verifyToken(token)) {
            user.setToken(token);
        } else {
            token = generateToken();
            if (verifyToken(token)) {
                user.setToken(token);
            }
        }
        user.setPassword(encryptedPassword);
        return userRepo.save(user);
    }

    public boolean validatePassword(String email, String password) {
        User user = userRepo.findByEmail(email);
        String token = generateToken();
        if (verifyToken(token)) {
            user.setToken(token);
        } else {
            token = generateToken();
            if (verifyToken(token)) {
                user.setToken(token);
            }
        }
        if (user != null) {
            boolean result = encoder.matches(password, user.getPassword());
            if (result) {
                userRepo.save(user);
                return true;
            }
        }
        return false;
    }

    public String getToken(String email, String password) {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            if (encoder.matches(password, user.getPassword())) {
                return user.getToken();
            }
        }
        return null;
    }

    private boolean verifyToken(String token) {
        return !userRepo.existsByToken(token);
    }

    public boolean validateToken(String token) {
        return !verifyToken(token);
    }

    public void logoutToken(String token) {
        userRepo.clearToken(token);
    }

    public UserDetail getUserDetail(String token) {
        UserDetail user = new UserDetail();
        User temp = userRepo.findByToken(token);

        user.setUserId(temp.getUserId());
        user.setName(temp.getName());
        user.setEmail(temp.getEmail());
        user.setBudgets(budgetRepo.findByUserId(user.getUserId()));
        user.setExpenses(expenseRepo.findByUserId(user.getUserId()));
        user.setGoals(goalsRepo.findByUserId(user.getUserId()));

        return user;
    }
}