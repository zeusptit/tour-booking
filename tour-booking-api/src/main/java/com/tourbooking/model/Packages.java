package com.tourbooking.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Packages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long capacity;
    private Long available;
    private Long cost;
    private LocalDate startDate;
    private LocalDate endDate;
    private String slug;
    private boolean deleted = false;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "packages")
    private List<Bookings> bookingsList;

    @ManyToOne
    @JoinColumn(name = "tour_guide_id")
    private TourGuides tourGuides;

    @OneToMany(mappedBy = "packages")
    private List<DayInPackages> dayInPackagesList;

}
