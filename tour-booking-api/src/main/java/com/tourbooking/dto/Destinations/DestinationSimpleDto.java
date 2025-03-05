package com.tourbooking.dto.Destinations;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class DestinationSimpleDto {
    private Long id;
    private String name;
}