package com.pocket.pocket.service;

import com.pocket.pocket.model.Expense;
import com.pocket.pocket.repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepo expenseRepo;


    public List<Expense> getExpenseByUserId(int userId) {
        return expenseRepo.findByUserId(userId);
    }

    public Expense addExpense(Expense expense) {
//        expense.setDate(new Date());
        return expenseRepo.save(expense);
    }
}
