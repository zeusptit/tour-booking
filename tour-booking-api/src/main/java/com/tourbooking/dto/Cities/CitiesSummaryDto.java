package com.tourbooking.dto.Cities;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CitiesSummaryDto {
    private Long id;
    private String name;
}
