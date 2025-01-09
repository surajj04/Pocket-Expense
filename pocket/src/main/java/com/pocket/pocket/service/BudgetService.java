package com.pocket.pocket.service;

import com.pocket.pocket.model.Budget;
import com.pocket.pocket.repository.BudgetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepo budgetRepo;

    public List<Budget> getBudgetByUserId(int userId) {
        return budgetRepo.findByUserId(userId);
    }

    public Budget addBudget(Budget budget) {
        Date date = new Date();
        budget.setDate(date);
        return budgetRepo.save(budget);
    }
}
