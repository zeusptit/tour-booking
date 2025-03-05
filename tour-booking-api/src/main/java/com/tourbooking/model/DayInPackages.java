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
public class DayInPackages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String name;
    private boolean deleted = false;
    @ManyToOne
    @JoinColumn(name = "packages_id")
    private Packages packages;
    @OneToMany(mappedBy = "dayInPackages")
    private List<Schedules> schedulesList;
}
