package com.tourbooking.controller;

import com.tourbooking.dto.Booking.BookingsDetailsDto;
import com.tourbooking.exception.BookingException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1/bookings")
public class BookingController {
    @Autowired
    private BookingsService bookingsService;

    @PostMapping("/addBooking")
    ResponseEntity<ResponseObject> addBooking(@RequestBody BookingsDetailsDto newBookingDto) {
        try {
            String paymentUrl = bookingsService.addBooking(newBookingDto);
            Map<String, String> mp = new HashMap<>();
            mp.put("paymentUrl", paymentUrl);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "Thêm đơn hàng thành công", mp));
        } catch (BookingException e) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getBooking(@PathVariable Long id) {
        try {
            BookingsDetailsDto bookingsDetailsDto = bookingsService.getBookingById(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "Lấy đơn hàng thành công", bookingsDetailsDto));
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("error", ex.getMessage(), null));
        }
    }
}
