package com.pocket.pocket.controller;

import com.pocket.pocket.model.Budget;
import com.pocket.pocket.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/budget")
    public Budget addBudget(@RequestBody Budget budget) {
        return budgetService.addBudget(budget);
    }

    @PutMapping("/budget")
    public Budget updateBudget(@RequestBody Budget budget) {
        return budgetService.updateBudget(budget);
    }
}
