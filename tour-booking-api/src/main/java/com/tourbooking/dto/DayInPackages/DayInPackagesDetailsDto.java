package com.tourbooking.dto.DayInPackages;

import com.tourbooking.dto.Schedules.SchedulesDetailsDto;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DayInPackagesDetailsDto {
    private Long id;
    private String date;
    private String name;
    private Long packagesId;
    private List<SchedulesDetailsDto> schedulesList;
}
