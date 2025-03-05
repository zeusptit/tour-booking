package com.tourbooking.repository;

import com.tourbooking.model.DestinationType;
import com.tourbooking.model.Destinations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DestinationsRepository extends JpaRepository<Destinations, Long> {
    long countByRateAndDestinationTypeAndDeletedFalse(Double rate, DestinationType type);
    long countByPriceAndDestinationTypeAndDeletedFalse(Long price, DestinationType type);
    long countByDestinationTypeAndDeletedFalse(DestinationType type);
    List<Destinations> findByDeletedFalse();
    List<Destinations> findByDestinationTypeAndDeletedFalse(DestinationType type);
    Optional<Destinations> findByIdAndDestinationTypeAndDeletedFalse(Long id, DestinationType type);
    Optional<Destinations> findBySlugAndDeletedFalse(String slug);
    Page<Destinations> findByDestinationTypeAndDeletedFalse(Pageable pageable, DestinationType type);
    Page<Destinations> findByNameContainingAndDestinationTypeAndDeletedFalse(String name, DestinationType destinationType, Pageable pageable);
    default void softDeleteById(Long id) {
        Optional<Destinations> optionalDestination = findById(id);
        optionalDestination.ifPresent(destination -> {
            destination.setDeleted(true);
            save(destination);
        });
    }
    Long countByDeletedFalse();
}
