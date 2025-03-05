package com.tourbooking.dto.Schedules;

import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class SchedulesDetailsDto {
    private Long id;
    private String name;
    private String startTime;
    private String endTime;
    private String description;
    private Long daysId;
    private DestinationsDetailsDto des;
}
