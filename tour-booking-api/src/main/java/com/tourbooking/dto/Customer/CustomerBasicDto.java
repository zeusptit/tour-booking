package com.tourbooking.dto.Customer;

import com.tourbooking.model.MembershipClass;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CustomerBasicDto {
    private Long id;
    private String ho;
    private String ten;
    private MembershipClass membership;
}

