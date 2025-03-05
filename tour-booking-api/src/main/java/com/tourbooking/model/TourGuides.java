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
public class TourGuides {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ho;
    private String ten;
    private LocalDate dob;
    private String phone;
    private Long salary;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "tourGuides")
    private List<Packages> packagesList;
}
