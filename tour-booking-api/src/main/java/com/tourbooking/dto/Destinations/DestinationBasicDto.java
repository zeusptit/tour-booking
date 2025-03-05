package com.tourbooking.dto.Destinations;

import com.tourbooking.dto.Cities.CitiesSummaryDto;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DestinationBasicDto {
    private Long id;
    private String name;
    private String address;
    private Double rate;
    private Long price;
    private String slug;
    private String image;
    private CitiesSummaryDto city;
}
