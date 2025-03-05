package com.tourbooking.controller;

import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.UserException;
import com.tourbooking.model.DestinationType;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1/public")

public class LandingPageController {
    @Autowired
    private VouchersService vouchersService;
    @Autowired
    private CitiesService citiesService;
    @Autowired
    private PackagesService packagesService;
    @Autowired
    private UserService userService;
    @Autowired
    private DestinationService destinationService;


    @GetMapping("/getAllCities")
    ResponseEntity<ResponseObject> getAllCities() {
        List<CitiesSummaryDto> citiesDtoList = citiesService.getAllCities();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sach cities thanh cong", citiesDtoList)
        );
    }

    @GetMapping("/getCity/{id}")
    ResponseEntity<ResponseObject> getCityById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay thong tin cities thanh cong", citiesService.getCityById(id))
        );
    }

    @GetMapping("/search")
    ResponseEntity<ResponseObject> search(@RequestParam(value = "city", defaultValue = "0") Long city,
                                          @RequestParam(value = "date", defaultValue = "0") String date,
                                          @RequestParam(value = "person", defaultValue = "1") Long person,
                                          @RequestParam(value = "priceRange", defaultValue = "0", required = false) Long priceRange) {
        Long minCost = 0L;
        Long maxCost = 0L;
        if (priceRange == 0) {
            minCost = 0L;
            maxCost = 10000000L;
        } else if (priceRange == 1) {
            minCost = 0L;
            maxCost = 1000000L;
        } else if (priceRange == 2) {
            minCost = 1000000L;
            maxCost = 2000000L;
        } else if (priceRange == 3) {
            minCost = 2000000L;
            maxCost = 10000000L;
        }
        List<PackagesSummaryDto> packagesDetailsDtoList = packagesService.searchPackages(
                city, date, person, minCost, maxCost);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sach packages thanh cong", packagesDetailsDtoList)
        );

    }

    @GetMapping("/getPackageDetailsBySlug/{slug}")
    ResponseEntity<ResponseObject> getPackageDetails(@PathVariable String slug) {
        PackagesDetailsDto packagesDetailsDto = packagesService.getPackagesBySlug(slug);
        if (packagesDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Package khong ton tai", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay package thanh cong", packagesDetailsDto)
        );
    }

    @GetMapping("/getPackageDetails/{id}")
    ResponseEntity<ResponseObject> getPackageDetails(@PathVariable Long id) {
        PackagesDetailsDto packagesDetailsDto = packagesService.getPackagesById(id);
        if (packagesDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Package khong ton tai", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay package thanh cong", packagesDetailsDto)
        );
    }

    @GetMapping("/getThreeNearestPackage")
    ResponseEntity<ResponseObject> getFourNearestPackage() {
        List<PackagesSummaryDto> packagesDetailsDtoList = packagesService.findThreeNearestPackage();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sach packages thanh cong", packagesDetailsDtoList)
        );
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<ResponseObject> forgotPassword(@RequestBody Map<String, String> emailMap) throws MessagingException {
        String email = emailMap.get("email");
        try {
            userService.forgotPassword(email);
        } catch (UserException userException) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", userException.getMessage(), false)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Gửi email đặt lại mật khẩu thành công", true)
        );
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<ResponseObject> resetPassword(@RequestBody Map<String, String> resetInfo) {
        try {
            userService.resetPassword(resetInfo);
        } catch (UserException userException) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", userException.getMessage(), false)
            );
        } catch (InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), false)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Đặt lại mật khẩu thành công", true)
        );
    }

    @GetMapping("/getAllHotels")
    ResponseEntity<ResponseObject> getAllHotels() {
        List<DestinationsDetailsDto> hotelsDtoList = destinationService.getAllHotels();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sach hotels thanh cong", hotelsDtoList)
        );
    }

    @GetMapping("/getHotels")
    ResponseEntity<ResponseObject> getPageHotels(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<DestinationsDetailsDto> pageDestination = destinationService.getPageDestination(DestinationType.HOTEL, page, size);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy danh sách khách sạn thành công", pageDestination)
        );
    }

    @GetMapping("/getAllPlacesOfVisit")
    ResponseEntity<ResponseObject> getAllPlacesOfVisit() {
        List<DestinationsDetailsDto> placesOfVisitDtoList = destinationService.getAllPlacesOfVisit();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sach place thanh cong", placesOfVisitDtoList)
        );
    }

    @GetMapping("/getPlaces")
    ResponseEntity<ResponseObject> getPagePlacesOfVisit(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<DestinationsDetailsDto> pageDestination = destinationService.getPageDestination(DestinationType.PLACES_OF_VISIT, page, size);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy danh sách điểm đến thành công", pageDestination)
        );
    }

    //    @GetMapping("/{id}")
//    ResponseEntity<ResponseObject> getPlaces(@PathVariable Long id) {
//        DestinationsDto destinationsDto = destinationService.getPlacesOfVisitById(id);
//        if (destinationsDto == null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("error", "Places of visit khong ton tai", null)
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "Lay places of visit thanh cong", destinationsDto)
//        );
//    }
    @GetMapping("/getDestination/{slug}")
    ResponseEntity<ResponseObject> getDestinationDetails(@PathVariable String slug) {
        DestinationsDetailsDto destinationsDetailsDto = destinationService.getDestinationsBySlug(slug);
        if (destinationsDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Places of visit khong ton tai", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay places of visit thanh cong", destinationsDetailsDto)
        );
    }

}
