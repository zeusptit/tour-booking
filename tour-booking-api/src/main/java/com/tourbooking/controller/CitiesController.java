package com.tourbooking.controller;

import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.CitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/cities")

public class CitiesController {
    @Autowired
    private CitiesService citiesService;

    @PostMapping("addCities")
    ResponseEntity<ResponseObject> addProduct(@RequestBody CitiesSummaryDto citiesDto) {
        CitiesSummaryDto newCitiesDto = citiesService.addCities(citiesDto);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Them city thanh cong", newCitiesDto)
        );
    }
}
