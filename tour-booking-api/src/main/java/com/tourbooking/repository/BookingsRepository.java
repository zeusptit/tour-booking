package com.tourbooking.repository;

import com.tourbooking.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    long countByPaymentStatus(PaymentStatus paymentStatus);
    List<Bookings> findByPaymentStatusAndCreatedAtBefore(PaymentStatus paymentStatus, LocalDateTime localDateTime);
    Optional<Bookings> findByCode(String code);
    List<Bookings> findAllByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    Page<Bookings> findAll(Pageable pageable);
    Page<Bookings> findByCodeContaining(String code, Pageable pageable);
    Page<Bookings> findByCodeContainingAndCustomers(String code, Customers customers, Pageable pageable);
    Page<Bookings> findByCodeContainingAndVouchers(String code, Vouchers vouchers, Pageable pageable);
}
