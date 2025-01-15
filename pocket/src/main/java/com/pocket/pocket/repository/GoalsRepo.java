package com.pocket.pocket.repository;

import com.pocket.pocket.model.Goals;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalsRepo extends JpaRepository<Goals, Integer> {
    List<Goals> findByUserId(int userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Goals g WHERE g.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);
}
