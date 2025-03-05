package com.tourbooking.repository;

import com.tourbooking.model.Cities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitiesRepository extends JpaRepository<Cities, Long> {
    Cities findByName(String city);
}
