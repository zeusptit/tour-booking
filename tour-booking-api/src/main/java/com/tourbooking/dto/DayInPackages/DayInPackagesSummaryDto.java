package com.tourbooking.dto.DayInPackages;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DayInPackagesSummaryDto {
    private Long id;
    private String date;
    private String name;
}
