package com.tourbooking.repository;

import com.tourbooking.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PackagesRepository extends JpaRepository<Packages, Long> {

    Optional<Packages> findBySlugAndDeletedFalse(String slug);
    Optional<Packages> findByIdAndDeletedFalse(Long id);
    List<Packages> findPackagesByTourGuidesAndDeletedFalse(TourGuides tourGuides);
    @Query("SELECT p FROM Packages p " +
            "INNER JOIN p.dayInPackagesList dp " +
            "INNER JOIN dp.schedulesList s " +
            "INNER JOIN s.destinations d " +
            "WHERE d.cities.id = :cityId " +
            "AND p.deleted = false " +
            "AND p.startDate = :startDate " +
            "AND p.available >= :available " +
            "AND p.cost BETWEEN :minCost AND :maxCost ")
    List<Packages> findByCityIdAndStartDateAndAvailableAndCost(@Param("cityId") Long cityId,
                                                               @Param("startDate") LocalDate startDate,
                                                               @Param("available") Long available,
                                                               @Param("minCost") Long minCost,
                                                               @Param("maxCost") Long maxCost);

    @Query("SELECT p FROM Packages p " +
            "WHERE p.deleted = false AND (p.startDate > CURRENT_DATE) " +
            "ORDER BY p.startDate ASC " +
            "LIMIT 3")
    List<Packages> findThreeNearestPackage();

    @Query("SELECT COUNT(p) FROM Packages p WHERE p.deleted = false AND (p.startDate <= CURRENT_DATE AND p.endDate >= CURRENT_DATE)")
    Long countOngoingPackages();

    @Query("SELECT COUNT(p) FROM Packages p WHERE p.deleted = false AND (p.endDate < CURRENT_DATE)")
    Long countFinishedPackages();

    @Query("SELECT COUNT(p) FROM Packages p WHERE p.deleted = false AND (p.startDate > CURRENT_DATE)")
    Long countUpcomingPackages();

    Page<Packages> findByNameContainingAndDeletedFalse(String name, Pageable pageable);

    Page<Packages> findByNameContainingAndDeletedFalseAndTourGuides(String name, TourGuides tourGuides, Pageable pageable);
    @Query("SELECT COUNT(p) FROM Packages p WHERE p.deleted = false AND (p.startDate > CURRENT_DATE) AND p.available > 0")
    Long countAvailable();
    Long countByDeletedFalse();
    default void softDeleteById(long id) {
        Packages packages = findById(id).orElse(null);
        if (packages != null) {
            packages.setDeleted(true);
            save(packages);
        }
    }

}
