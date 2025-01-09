package com.pocket.pocket.controller;

import com.pocket.pocket.model.Goals;
import com.pocket.pocket.service.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoalController {

    @Autowired
    private GoalsService goalsService;

    @PostMapping("/goal")
    public Goals addGoals(@RequestBody Goals goals) {
        System.out.println(goals);
        return goalsService.addGoal(goals);
    }
}
