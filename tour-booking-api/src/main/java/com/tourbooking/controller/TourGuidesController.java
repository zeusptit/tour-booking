package com.tourbooking.controller;

import com.tourbooking.auth.Token;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.PackagesService;
import com.tourbooking.service.TourGuidesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/tourguides")

public class TourGuidesController {
    @Autowired
    private TourGuidesService tourGuidesService;
    @Autowired
    private PackagesService packagesService;

    @GetMapping("/getInfo")
    ResponseEntity<ResponseObject> getTourGuidesInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);
            TourGuidesDetailsDto tourGuidesDetailsDto = tourGuidesService.getTourGuidesDtoByToken(new Token(accessToken, ""));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy thông tin hướng dẫn viên thành công", tourGuidesDetailsDto)
            );
        } else {
            // Xử lý nếu không có hoặc không hợp lệ
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Lấy thông tin hướng dẫn viên không thành công", null)
            );
        }
    }

    @PutMapping("/editInfo")
    ResponseEntity<ResponseObject> editTourGuidesInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
                                                      @RequestBody TourGuidesDetailsDto newTourGuidesDetailsDto) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);
            try {
                TourGuidesDetailsDto tourGuidesDetailsDto = tourGuidesService.editTourGuidesInfo(new Token(accessToken, ""), newTourGuidesDetailsDto);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Sửa thông tin hướng dẫn viên thành công", tourGuidesDetailsDto)
                );
            } catch (InputException e) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", e.getMessage(), null)
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Sửa thông tin hướng dẫn viên không thành công", null)
            );
        }
    }

    @GetMapping("/getPackagesList")
    ResponseEntity<ResponseObject> getPackagesList(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Lấy token bằng cách loại bỏ phần "Bearer " từ header
            String accessToken = authorizationHeader.substring(7);
            // Xử lý token ở đây
            List<PackagesBasicDto> packagesDetailsDtoList = tourGuidesService.getPackagesList(new Token(accessToken, ""));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách tour thành công", packagesDetailsDtoList)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("error", "Lấy danh sách tour không thành công", null)
        );


    }
}
