package com.tourbooking.dto.Booking;

import com.tourbooking.model.PaymentStatus;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class BookingsBasicDto {
    private Long id;
    private String code;
    private Long total;
    private String note;
    private String createAt;
    private PaymentStatus paymentStatus;
}
