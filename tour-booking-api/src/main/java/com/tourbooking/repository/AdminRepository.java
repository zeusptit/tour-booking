package com.tourbooking.repository;

import com.tourbooking.model.Admin;
import com.tourbooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long>{
    Admin findByUser(User user);
}