package com.tourbooking.dto.Packages;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class PackagesStatisticsDto {
    private long packagesCount;
    private long available;
    private long upcoming;
    private long finished;
}
