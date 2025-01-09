package com.pocket.pocket.repository;

import com.pocket.pocket.model.Goals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalsRepo extends JpaRepository<Goals,Integer> {
    List<Goals> findByUserId(int userId);
}
