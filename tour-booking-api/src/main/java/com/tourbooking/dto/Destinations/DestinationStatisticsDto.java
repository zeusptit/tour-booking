package com.tourbooking.dto.Destinations;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DestinationStatisticsDto {
    private long count;
    private long fivestar;
    private long fourstar;
    private long free;
}
