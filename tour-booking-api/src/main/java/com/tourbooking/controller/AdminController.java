package com.tourbooking.controller;

import com.tourbooking.auth.Token;
import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Admin.AdminDetailsDto;
import com.tourbooking.dto.Booking.BookingStatisticsDto;
import com.tourbooking.dto.Booking.BookingsSummaryDto;
import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.dto.Customer.CustomerStatisticsDto;
import com.tourbooking.dto.Customer.CustomerSummaryDto;
import com.tourbooking.dto.Destinations.*;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesStatisticsDto;
import com.tourbooking.dto.Stats.StatsDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesStatisticsDto;
import com.tourbooking.dto.TourGuides.TourGuidesSummaryDto;
import com.tourbooking.dto.Vouchers.VouchersStatisticsDto;
import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import com.tourbooking.exception.BookingException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.DestinationType;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private TourGuidesService tourGuidesService;
    @Autowired
    private VouchersService vouchersService;
    @Autowired
    private CitiesService citiesService;
    @Autowired
    private DestinationService destinationService;
    @Autowired
    private PackagesService packagesService;
    @Autowired
    private BookingsService bookingsService;
    @Autowired
    private StatsService statsService;

    @GetMapping("/getAllTourGuides")
    ResponseEntity<ResponseObject> getAllTourGuides() {
        try {
            List<TourGuidesSummaryDto> tourGuidesDetailsDtoList = tourGuidesService.getAllTourGuides();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách hướng dẫn viên thành công", tourGuidesDetailsDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }

    }

    @GetMapping("/getAllCustomers")
    ResponseEntity<ResponseObject> getAllCustomers() {
        try {
            List<CustomerSummaryDto> customerDetailsDtoList = customerService.getAllCustomers();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách khách hàng thành công", customerDetailsDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/searchCustomers")
    ResponseEntity<ResponseObject> searchCustomers(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<CustomerSummaryDto> customerSummaryDtoPage = customerService.searchCustomers(keyword, page);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách khách hàng thành công", customerSummaryDtoPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/searchTourguides")
    ResponseEntity<ResponseObject> searchTourguide(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<TourGuidesSummaryDto> tourGuidesSummaryDtoPage = tourGuidesService.searchTourguides(keyword, page);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách hướng dẫn viên thành công", tourGuidesSummaryDtoPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }


    @GetMapping("/searchVouchers")
    ResponseEntity<ResponseObject> searchVouchers(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<VouchersSummaryDto> vouchersSummaryDtoPage = vouchersService.searchVouchers(keyword, page);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách mã giảm giá thành công", vouchersSummaryDtoPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/searchHotels")
    ResponseEntity<ResponseObject> searchHotels(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<DestinationBasicDto> destinationBasicDtoPage =
                    destinationService.searchDestinations(keyword, page, DestinationType.HOTEL);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách khách sạn thành công", destinationBasicDtoPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/searchPlaces")
    ResponseEntity<ResponseObject> searchPlaces(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<DestinationBasicDto> destinationBasicDtoPage =
                    destinationService.searchDestinations(keyword, page, DestinationType.PLACES_OF_VISIT);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách điểm đến thành công", destinationBasicDtoPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/searchPackages")
    ResponseEntity<ResponseObject> searchPackages(
            @RequestParam(value = "tourguide", required = false) Optional<Long> tourguideId,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<?> packagesPage;
            if (tourguideId.isPresent()) {
                packagesPage = packagesService.searchTourguidePackages(tourguideId.get(), keyword, page);
            } else {
                packagesPage = packagesService.searchPackages(keyword, page);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách gói tour thành công", packagesPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/getCustomerStats")
    ResponseEntity<ResponseObject> getCustomerStats() {
        CustomerStatisticsDto customerStatisticsDto = customerService.getCustomerStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê khách hàng thành công", customerStatisticsDto)
        );
    }

    @GetMapping("/getTourGuideStats")
    ResponseEntity<ResponseObject> getTourGuideStats() {
        TourGuidesStatisticsDto tourGuidesStatisticsDto = tourGuidesService.getTourGuidesStatistics();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê hướng dẫn viên thành công", tourGuidesStatisticsDto)
        );
    }

    @GetMapping("/getVoucherStats")
    ResponseEntity<ResponseObject> getVoucherStats() {
        VouchersStatisticsDto vouchersStatisticsDto = vouchersService.getVoucherStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê hướng dẫn viên thành công", vouchersStatisticsDto)
        );
    }

    @GetMapping("/getHotelStats")
    ResponseEntity<ResponseObject> getHotelStats() {
        DestinationStatisticsDto stats = destinationService.getHotelStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê khách sạn thành công", stats)
        );
    }

    @GetMapping("/getPlaceStats")
    ResponseEntity<ResponseObject> getPlaceStats() {
        DestinationStatisticsDto stats = destinationService.getPlaceStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê điểm đến thành công", stats)
        );
    }

    @GetMapping("/getPackageStats")
    ResponseEntity<ResponseObject> getPackageStats() {
        PackagesStatisticsDto stats = packagesService.getPackageStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê tour thành công", stats)
        );
    }

    @GetMapping("/getAllCities")
    ResponseEntity<ResponseObject> getAllCities() {
        List<CitiesSummaryDto> citiesDtoList = citiesService.getAllCities();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy danh sách thành phố thành công", citiesDtoList)
        );
    }

    @GetMapping("/getAllHotels")
    ResponseEntity<ResponseObject> getAllHotels() {
        try {
            List<DestinationsDetailsDto> hotelsDtoList = destinationService.getAllHotels();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lay danh sách khách sạn thành công", hotelsDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/getAllRestaurants")
    ResponseEntity<ResponseObject> getAllRestaurants() {
        List<DestinationsDetailsDto> restaurantsDtoList = destinationService.getAllRestaurants();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lay danh sách nhà hàng thành công", restaurantsDtoList)
        );
    }

    @GetMapping("/getAllPlaces")
    ResponseEntity<ResponseObject> getAllPlacesOfVisit() {
        try {
            List<DestinationsDetailsDto> placesOfVisitDtoList = destinationService.getAllPlacesOfVisit();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lay danh sách địa điểm thành công", placesOfVisitDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }

    }

    @GetMapping("/getPagePlacesOfVisit")
    ResponseEntity<ResponseObject> getPagePlacesOfVisit(
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<DestinationsDetailsDto> placesOfVisitDtoList =
                    destinationService.getPageDestination(DestinationType.PLACES_OF_VISIT, page, 10);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lay danh sách địa điểm thành công", placesOfVisitDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }

    }

    @GetMapping("/getAllPackages")
    ResponseEntity<ResponseObject> getAllPackages() {
        try {
            List<PackagesBasicDto> packagesDetailsDtoList = packagesService.getAllPackages();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách gói tour thành công", packagesDetailsDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/getAllBookings")
    ResponseEntity<ResponseObject> getAllBookings() {
        try {
            List<BookingsSummaryDto> bookingsSummaryDtoList = bookingsService.getAllBookings();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách booking thành công", bookingsSummaryDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }
//    @GetMapping("/getAllBookingsPage")
//    ResponseEntity<ResponseObject> getAllBookingsPage(
//            @RequestParam(value = "page", defaultValue = "0") int page) {
//        try {
//            Page<BookingsSummaryDto> bookingsSummaryDtoPage = bookingsService.getAllBookingsPage(page);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("ok", "Lấy danh sách booking thành công", bookingsSummaryDtoPage)
//            );
//        }  catch (NoContentException ex) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("error", ex.getMessage(), null)
//            );
//        }
//    }

    @GetMapping("/searchBookings")
    ResponseEntity<ResponseObject> searchBookings(
            @RequestParam(value = "voucher", required = false) Optional<Long> voucherId,
            @RequestParam(value = "customer", required = false) Optional<Long> customerId,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            Page<?> bookingsPage;
            if (voucherId.isPresent()) {
                bookingsPage = bookingsService.searchVoucherBookings(voucherId.get(), keyword, page);
            } else if (customerId.isPresent()) {
                bookingsPage = bookingsService.searchCustomerBookings(customerId.get(), keyword, page);
            } else {
                bookingsPage = bookingsService.searchBookings(keyword, page);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách đơn hàng thành công", bookingsPage)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", ex.getMessage(), null)
            );
        }
    }


    @GetMapping("/getStats")
    ResponseEntity<ResponseObject> getStats() {
        StatsDto statsDto = statsService.getStats();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê chung thành công", statsDto)
        );
    }

    @PostMapping("/getBookingStatsByDay")
    ResponseEntity<ResponseObject> getBookingStatsByDay(@RequestBody Map<String, Integer> date) {
        Map<LocalDate, BookingStatisticsDto> statisticsByDayOfMonth = bookingsService.getBookingStatisticsByDayOfMonth(date.get("year"), date.get("month"));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy thống kê đơn hàng theo ngày thành công", statisticsByDayOfMonth)
        );
    }

    @GetMapping("/getCustomer/{id}")
    ResponseEntity<ResponseObject> getCustomerById(@PathVariable Long id) {
        try {
            CustomerSummaryDto customerSummaryDto = customerService.getCustomerById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy khách hàng thành công", customerSummaryDto)
            );
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/getTourGuide/{id}")
    ResponseEntity<ResponseObject> getTourGuideById(@PathVariable Long id) {
        try {
            TourGuidesSummaryDto tourGuidesSummaryDto = tourGuidesService.getTourGuideById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy hướng dẫn viên thành công", tourGuidesSummaryDto)
            );
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @PutMapping("/editTourGuideSalary")
    ResponseEntity<ResponseObject> editTourGuideById(@RequestBody TourGuidesDetailsDto newTourGuidesDetailsDto) {
        TourGuidesDetailsDto tourGuidesDetailsDto = tourGuidesService.editTourGuideSalary(newTourGuidesDetailsDto);
        if (tourGuidesDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "TourGuide khong ton tai", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Sua TourGuide thanh cong", tourGuidesDetailsDto)
        );
    }

    @GetMapping("/getAllVouchers")
    ResponseEntity<ResponseObject> getAllVouchers() {
        try {
            List<VouchersSummaryDto> vouchersDetailsDtoList = vouchersService.getAllVouchers();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sach mã giảm giá thành công", vouchersDetailsDtoList)
            );
        } catch (NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/getDesList")
    ResponseEntity<ResponseObject> getDesList() {
        List<DestinationSimpleDto> destinationSimpleDtoList = destinationService.getDesList();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Lấy danh sách địa điểm thành công", destinationSimpleDtoList)
        );
    }

    @PutMapping("confirmBooking/{id}")
    ResponseEntity<ResponseObject> confirmBooking(@PathVariable Long id) {
        try {
            boolean confirmed = bookingsService.confirmBooking(id);
        } catch (BookingException | MessagingException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), false)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Xác nhận thanh toán thành công", true)
        );
    }

    @GetMapping("/getInfo")
    ResponseEntity<ResponseObject> getAdmin(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Lấy token bằng cách loại bỏ phần "Bearer " từ header
            String accessToken = authorizationHeader.substring(7);
            // Xử lý token ở đây
            AdminDetailsDto adminDetailsDto = adminService.getAdminDtoByToken(new Token(accessToken, ""));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy thông tin người dùng admin thành công", adminDetailsDto)
            );
        } else {
            // Xử lý nếu không có hoặc không hợp lệ
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Lấy thông tin người dùng admin không thành công", null)
            );
        }
    }

    @PutMapping("/editInfo")
    ResponseEntity<ResponseObject> editAdminInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
                                                 @RequestBody AdminDetailsDto newAdminDetailsDto) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);
            AdminDetailsDto adminDetailsDto = adminService.editAdminInfo(new Token(accessToken, ""), newAdminDetailsDto);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Sua thong tin admin thanh cong", adminDetailsDto)
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Sua thong tin admin khong thanh cong", null)
            );
        }
    }
}
