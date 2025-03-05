package com.tourbooking.controller;

import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/admin/restaurants")

public class RestaurantsController {
    @Autowired
    private DestinationService destinationService;

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getRestaurant(@PathVariable Long id) {
        DestinationsDetailsDto destinationsDetailsDto = destinationService.getRestaurantById(id);
        if (destinationsDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Restaurant khong ton tai", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay restaurant thanh cong", destinationsDetailsDto)
        );
    }

    @PostMapping("/addRestaurants")
    ResponseEntity<ResponseObject> addRestaurants(@RequestBody DestinationsDetailsDto destinationsDetailsDto) {
        DestinationsDetailsDto restaurantDto = destinationService.addRestaurants(destinationsDetailsDto);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Them restaurant thanh cong", restaurantDto)
        );
    }

    @PutMapping("/editRestaurants")
    ResponseEntity<ResponseObject> editRestaurants(@RequestBody DestinationsDetailsDto destinationsDetailsDto) {
        DestinationsDetailsDto updatedRestaurantDto = destinationService.editRestaurants(destinationsDetailsDto);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Cap nhat restaurant thanh cong", updatedRestaurantDto)
        );
    }
}
