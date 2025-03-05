package com.tourbooking.dto.Booking;

import com.tourbooking.dto.Customer.CustomerBasicDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.dto.Vouchers.VouchersBasicDto;
import com.tourbooking.model.PaymentStatus;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class BookingsDetailsDto {
    private Long id;
    private String code;
    private Long numberOfPeople;
    private Long subtotal;
    private Long voucher;
    private Long member;
    private Long total;
    private String note;
    private boolean pickup;
    private String createAt;
    private String updateAt;
    private PaymentStatus paymentStatus;
    private CustomerBasicDto customers;
    private PackagesSummaryDto packages;
    private VouchersBasicDto vouchers;
}
