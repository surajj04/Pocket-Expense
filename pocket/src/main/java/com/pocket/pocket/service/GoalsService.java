package com.pocket.pocket.service;

import com.pocket.pocket.model.Goals;
import com.pocket.pocket.repository.GoalsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalsService {

    @Autowired
    private GoalsRepo goalsRepo;

    public List<Goals> findGoalByUserId(int userId) {
        return goalsRepo.findByUserId(userId);
    }

}
