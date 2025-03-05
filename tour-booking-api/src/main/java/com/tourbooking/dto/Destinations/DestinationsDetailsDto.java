package com.tourbooking.dto.Destinations;

import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.model.DestinationType;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DestinationsDetailsDto {
    private Long id;
    private String name;
    private String description;
    private String address;
    private DestinationType destinationType;
    private Double rate;
    private Long price;
    private String slug;
    private List<String> image;
    private Long cityId;
    private String cityName;
    private CitiesSummaryDto city;
}
