package com.tourbooking.repository;

import com.tourbooking.model.Vouchers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VouchersRepository extends JpaRepository<Vouchers, Long> {
    Optional<Vouchers> findByCodeAndDeletedFalse(String code);
    @Query("SELECT s FROM Vouchers s WHERE  s.deleted = false AND (lower(concat(s.name)) LIKE lower(concat('%', :keyword, '%')) OR lower(s.code) LIKE lower(concat('%', :keyword, '%'))) ")
    Page<Vouchers> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    Long countByDeletedFalse();
    default void softDeleteById(long id) {
        Vouchers voucher = findById(id).orElse(null);
        if (voucher != null) {
            voucher.setDeleted(true);
            save(voucher);
        }
    }
}
