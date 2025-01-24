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

    public List<Expense> getAllExpense() {
        return expenseRepo.findAll();
    }

    public List<Expense> getExpenseByUserId(int userId) {
        return expenseRepo.findByUserId(userId);
    }

    public Expense addExpense(Expense expense) {
        System.out.println(expense);
        manageBudget(expense);
        return expenseRepo.save(expense);
    }

    public void manageBudget(Expense expense) {
        List<Budget> budgets = budgetService.getBudgetByUserId(expense.getUserId());

        if (budgets == null || budgets.isEmpty()) {
            System.err.println("No budgets found for user ID: " + expense.getUserId());
            return;
        }

        Budget budget = budgets.get(budgets.size() - 1);

        String category = expense.getCategory();
        if (category == null) {
            System.err.println("Expense category is null.");
            return;
        }

        double amount = expense.getAmount();

        switch (category) {
            case "Food":
                budget.setFood(budget.getFood() - amount);
                break;
            case "Bills":
                budget.setBills(budget.getBills() - amount);
                break;
            case "Travel":
                budget.setTravel(budget.getTravel() - amount);
                break;
            default:
                budget.setCurrentBalance(budget.getCurrentBalance() - amount);
                break;
        }

        budgetService.updateBudget(budget);
    }

}
