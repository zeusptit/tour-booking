package com.tourbooking.service;

import com.tourbooking.dto.Destinations.*;
import com.tourbooking.model.DestinationType;
import com.tourbooking.model.Destinations;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DestinationService {
    DestinationsDetailsDto addDestinations(DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto editDestinations(DestinationsDetailsDto destinationsDetailsDto);
    List<DestinationsDetailsDto> getAllDestinationsDto();
    DestinationsDetailsDto getDestinationsById(Long id);
    DestinationsDetailsDto getDestinationsBySlug(String slug);
    DestinationsDetailsDto getHotelById(Long id);
    DestinationsDetailsDto getRestaurantById(Long id);
    DestinationsDetailsDto getPlacesOfVisitById(Long id);
    List<DestinationsDetailsDto> getAllHotels();
    List<DestinationsDetailsDto> getAllRestaurants();
    List<DestinationsDetailsDto> getAllPlacesOfVisit();
    Page<DestinationsDetailsDto> getPageDestination(DestinationType type, int page, int size);
    DestinationsDetailsDto addHotels(DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto addRestaurants(DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto addPlacesOfVisit(DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto editHotels(Long id, DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto editRestaurants(DestinationsDetailsDto destinationsDetailsDto);
    DestinationsDetailsDto editPlacesOfVisit(Long id, DestinationsDetailsDto destinationsDetailsDto);

    DestinationsDetailsDto convertToDto(Destinations destinations);

    Page<DestinationBasicDto> searchDestinations(String keyword, int page, DestinationType destinationType);

    DestinationStatisticsDto getHotelStats();

    DestinationStatisticsDto getPlaceStats();

    void deletePlaces(Long id);
    void deleteHotels(Long id);

    List<DestinationSimpleDto> getDesList();
}
