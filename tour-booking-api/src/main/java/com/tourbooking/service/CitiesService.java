package com.tourbooking.service;

import com.tourbooking.dto.Cities.CitiesDetailsDto;
import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.model.Cities;

import java.util.List;

public interface CitiesService {
    CitiesSummaryDto addCities(CitiesSummaryDto citiesDto);
    List<CitiesSummaryDto> getAllCities();
    Cities findByName(String city);
    Cities findById(Long id);
    CitiesDetailsDto getCityById(Long id);
}
