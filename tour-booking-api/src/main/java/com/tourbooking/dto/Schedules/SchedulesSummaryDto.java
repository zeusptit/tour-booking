package com.tourbooking.dto.Schedules;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class SchedulesSummaryDto {
    private Long id;
    private String name;
    private String startTime;
    private String endTime;
    private String description;
}
