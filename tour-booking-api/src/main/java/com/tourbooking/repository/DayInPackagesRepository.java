package com.tourbooking.repository;

import com.tourbooking.model.DayInPackages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayInPackagesRepository extends JpaRepository<DayInPackages, Long> {
    default void softDeleteById(long id) {
        DayInPackages dayInPackages = findById(id).orElse(null);
        if (dayInPackages != null) {
            dayInPackages.setDeleted(true);
            save(dayInPackages);
        }
    }
}
