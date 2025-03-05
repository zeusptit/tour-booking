package com.tourbooking.dto.Customer;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CustomerStatisticsDto {
    private long customerCount;
    private long premiumCount;
    private long standardCount;
}
