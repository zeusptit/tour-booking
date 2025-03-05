package com.tourbooking.dto.Destinations;

import com.tourbooking.model.DestinationType;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DestinationsSummaryDto {
    private Long id;
    private String name;
    private String description;
    private String address;
    private DestinationType destinationType;
    private Double rate;
    private Long price;
    private String slug;
    private String image;
}
