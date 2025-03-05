package com.tourbooking.dto.Vouchers;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class VouchersSummaryDto {
    private Long id;
    private String name;
    private String code;
    private String startTime;
    private String endTime;
    private Long amount;
    private Long percent;
}
