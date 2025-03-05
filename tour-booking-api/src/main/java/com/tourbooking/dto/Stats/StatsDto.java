package com.tourbooking.dto.Stats;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class StatsDto {
    private Long customersNumber;
    private Long tourguidesNumber;
    private Long packagesNumber;
    private Long bookingsNumber;
    private Long expiredBookingsNumber;
    private Long pendingBookingsNumber;
    private Long paidBookingsNumber;
    private Long finishedPackages;
    private Long ongoingPackages;
    private Long upcomingPackages;
}
