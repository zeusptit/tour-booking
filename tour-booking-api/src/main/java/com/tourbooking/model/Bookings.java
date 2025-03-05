package com.tourbooking.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Long numberOfPeople;
    private Long subtotal;
    private Long voucher;
    private Long member;
    private Long total;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updateAt;
    private boolean pickup;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "customers_id")
    private Customers customers;

    @ManyToOne
    @JoinColumn(name = "packages_id")
    private Packages packages;

    @ManyToOne
    @JoinColumn(name = "vouchers_id")
    private Vouchers vouchers;

    @OneToOne
    private VNPay vnPay;
}
