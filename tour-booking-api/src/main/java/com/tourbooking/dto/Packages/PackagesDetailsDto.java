package com.tourbooking.dto.Packages;

import com.tourbooking.dto.DayInPackages.DayInPackagesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesBasicDto;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class PackagesDetailsDto {
    private Long id;
    private String name;
    private Long capacity;
    private Long available;
    private Long cost;
    private String startDate;
    private String endDate;
    private String description;
    private String slug;
    private String image1;
    private List<String> imageList;
    private List<String> imageHotelList;
    private TourGuidesBasicDto tourGuidesDto;
    //private List<Bookings> bookingsList;
    private List<DayInPackagesDetailsDto> dayList;
}
