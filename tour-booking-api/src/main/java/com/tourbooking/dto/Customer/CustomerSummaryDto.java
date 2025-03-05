package com.tourbooking.dto.Customer;

import com.tourbooking.model.MembershipClass;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CustomerSummaryDto {
    private Long id;
    private String ho;
    private String ten;
    private String dob;
    private MembershipClass membership;
    private String phone;
    private String email;
}
