package com.tourbooking.dto.Admin;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class AdminDetailsDto {
    private Long id;
    private String ho;
    private String ten;
    private String title;
    private String email;
}
