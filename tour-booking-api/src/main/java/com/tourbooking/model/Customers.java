package com.tourbooking.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ho;
    private String ten;
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    private MembershipClass membership;

    private String phone;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "customers")
    private List<Bookings> bookingsList;


}
