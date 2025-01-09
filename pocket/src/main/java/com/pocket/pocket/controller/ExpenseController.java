package com.pocket.pocket.controller;

import com.pocket.pocket.model.Expense;
import com.pocket.pocket.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/expense/{userId}")
    public List<Expense> getAllExpenseByUserId(@PathVariable int userId) {
        return expenseService.getExpenseByUserId(userId);
    }

    @PostMapping("/expense")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

}
