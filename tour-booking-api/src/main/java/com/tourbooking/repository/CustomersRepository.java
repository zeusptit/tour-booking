package com.tourbooking.repository;

import com.tourbooking.model.Customers;
import com.tourbooking.model.MembershipClass;
import com.tourbooking.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Long> {
    Customers findByUser(User user);
    long countByMembership(MembershipClass membershipClass);
    @Query("SELECT s FROM Customers s WHERE lower(concat(s.ho, ' ', s.ten)) LIKE lower(concat('%', :keyword, '%')) OR lower(s.phone) LIKE lower(concat('%', :keyword, '%'))")
    Page<Customers> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
