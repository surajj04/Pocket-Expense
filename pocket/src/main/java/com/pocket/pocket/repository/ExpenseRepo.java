package com.pocket.pocket.repository;

import com.pocket.pocket.model.Expense;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Integer> {
    List<Expense> findByUserId(int userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Expense e WHERE e.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);
}
