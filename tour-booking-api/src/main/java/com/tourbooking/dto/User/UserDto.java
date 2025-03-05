package com.tourbooking.dto.User;

import com.tourbooking.model.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class UserDto {
    private Long id;
    private String email;
    private Role role;
}
