package com.tourbooking.dto.Packages;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class PackagesSummaryDto {
    private Long id;
    private String name;
    private Long capacity;
    private Long available;
    private Long cost;
    private String startDate;
    private String endDate;
    private String description;
    private String slug;
    private String image1;
}
