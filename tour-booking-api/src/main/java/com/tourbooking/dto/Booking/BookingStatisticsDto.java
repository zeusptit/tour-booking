package com.tourbooking.dto.Booking;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class BookingStatisticsDto {
    private int bookingCount;
    private long totalRevenue;
}
