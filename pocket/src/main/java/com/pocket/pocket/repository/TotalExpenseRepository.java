package com.pocket.pocket.repository;

import com.pocket.pocket.model.TotalExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalExpenseRepository extends JpaRepository<TotalExpense, Integer> {
    TotalExpense findByUserId(int userId);
}
