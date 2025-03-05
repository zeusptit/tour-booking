package com.tourbooking.dto.Cities;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class CitiesDetailsDto {
    private Long id;
    private String name;
    private String description;
}
