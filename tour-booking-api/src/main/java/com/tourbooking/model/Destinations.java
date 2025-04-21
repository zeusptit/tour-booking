package com.tourbooking.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class Destinations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    private String address;
    private Double rate;
    private Long price;

    @ElementCollection
    @CollectionTable(name = "destination_images", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private List<String> image;

    private String slug;
    private boolean deleted = false;
    @Enumerated(EnumType.STRING)
    private DestinationType destinationType;
    @OneToMany(mappedBy = "destinations")
    private List<Schedules> schedulesList;
    @ManyToOne
    @JoinColumn(name = "cities_id")
    private Cities cities;
}
