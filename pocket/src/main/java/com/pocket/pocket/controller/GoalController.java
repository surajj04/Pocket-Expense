package com.pocket.pocket.controller;

import com.pocket.pocket.model.Goals;
import com.pocket.pocket.service.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GoalController {

    @Autowired
    private GoalsService goalsService;

    @GetMapping("/goal/{id}")
    public List<Goals> getAllGoals(@PathVariable int id) {
        return goalsService.getAllGoals(id);
    }

    @PostMapping("/goal")
    public Goals addGoals(@RequestBody Goals goals) {
        return goalsService.addGoal(goals);
    }

    @PutMapping("/goal")
    public Goals updateGoals(@RequestBody Goals goal) {
        return goalsService.updateGoal(goal);
    }

    @DeleteMapping("/goal/{id}")
    public void deleteGoals(@PathVariable int id) {
        goalsService.deleteGoal(id);
    }
}
