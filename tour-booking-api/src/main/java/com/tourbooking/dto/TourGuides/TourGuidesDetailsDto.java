package com.tourbooking.dto.TourGuides;

import com.tourbooking.dto.Packages.PackagesDetailsDto;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class TourGuidesDetailsDto {
    private Long id;
    private String ho;
    private String ten;
    private String dob;
    private String phone;
    private Long salary;
    private String email;
    private List<PackagesDetailsDto> packagesList;
}
