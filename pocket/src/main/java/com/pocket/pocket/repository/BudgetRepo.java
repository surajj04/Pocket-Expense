package com.pocket.pocket.repository;

import com.pocket.pocket.model.Budget;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepo extends JpaRepository<Budget, Integer> {

    List<Budget> findByUserId(int userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Budget b WHERE b.userId = :userId")
    void deleteBudgetByUserId(@Param("userId") int userId);
}
