package com.tourbooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class VNPay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String txnRef;
    private String transactionDate;
    private boolean isQueried = false;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String paymentUrl;
}
