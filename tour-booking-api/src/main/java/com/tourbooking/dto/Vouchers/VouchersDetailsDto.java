package com.tourbooking.dto.Vouchers;

import com.tourbooking.dto.Booking.BookingsBasicDto;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class VouchersDetailsDto {
    private Long id;
    private String name;
    private String code;
    private String startTime;
    private String endTime;
    private Long amount;
    private Long percent;
    private List<BookingsBasicDto> bookingsList;
}
