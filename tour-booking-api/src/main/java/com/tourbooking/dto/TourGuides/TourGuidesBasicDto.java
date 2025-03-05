package com.tourbooking.dto.TourGuides;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class TourGuidesBasicDto {
    private Long id;
    private String ho;
    private String ten;
    private String dob;
    private String phone;
}
