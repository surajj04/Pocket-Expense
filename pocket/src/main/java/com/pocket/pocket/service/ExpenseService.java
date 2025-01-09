package com.pocket.pocket.service;

import com.pocket.pocket.model.Budget;
import com.pocket.pocket.model.Expense;
import com.pocket.pocket.repository.BudgetRepo;
import com.pocket.pocket.repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepo expenseRepo;
    @Autowired
    private BudgetService budgetService;


    public List<Expense> getExpenseByUserId(int userId) {
        return expenseRepo.findByUserId(userId);
    }

    public Expense addExpense(Expense expense) {
        List<Budget> budgets = budgetService.getBudgetByUserId(expense.getUserId());
        Budget budget = budgets.getLast();
        budget.setCurrentBalance(budget.getCurrentBalance() - expense.getAmount());
        budgetService.updateBudget(budget);
        return expenseRepo.save(expense);
    }
}
