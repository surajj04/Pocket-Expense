package com.pocket.pocket.repository;

import com.pocket.pocket.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    boolean existsByToken(String token);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.token = NULL WHERE u.token = :token")
    void clearToken(String token);

    User findByToken(String token);
}
