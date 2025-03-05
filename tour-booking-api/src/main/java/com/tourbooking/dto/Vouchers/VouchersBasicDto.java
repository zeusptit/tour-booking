package com.tourbooking.dto.Vouchers;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class VouchersBasicDto {
    private Long id;
    private String code;
    private Long percent;
}
