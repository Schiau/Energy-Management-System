package com.schiau.App.repositories;

import com.schiau.App.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByRealId(Integer userId);
}
