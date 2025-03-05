package com.tourbooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Schedules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String startTime;
    private String endTime;
    private boolean deleted = false;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "day_in_packages_id")
    private DayInPackages dayInPackages;
    @ManyToOne
    @JoinColumn(name = "Destinations_id")
    private Destinations destinations;
}
