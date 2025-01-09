package com.pocket.pocket.repository;

import com.pocket.pocket.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepo extends JpaRepository<Budget,Integer> {
    List<Budget> findByUserId(int userId);
}
