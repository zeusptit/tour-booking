package com.tourbooking.dto.TourGuides;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class TourGuidesSummaryDto {
    private Long id;
    private String ho;
    private String ten;
    private String dob;
    private String phone;
    private Long salary;
    private String email;
}
