package com.tourbooking.dto.Customer;

import com.tourbooking.dto.Booking.BookingsDetailsDto;
import com.tourbooking.model.MembershipClass;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CustomerDetailsDto {
    private Long id;
    private String ho;
    private String ten;
    private String dob;
    private MembershipClass membership;
    private String phone;
    private String email;
    private List<BookingsDetailsDto> bookingsList;
}
