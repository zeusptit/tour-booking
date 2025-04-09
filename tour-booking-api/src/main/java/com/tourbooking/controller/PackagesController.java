package com.tourbooking.controller;

import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesDetailsDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesSummaryDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.dto.Schedules.SchedulesDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.exception.ScheduleException;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.DayInPackagesService;
import com.tourbooking.service.PackagesService;
import com.tourbooking.service.SchedulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/admin/packages")
@RequiredArgsConstructor
public class PackagesController {
    private final PackagesService packagesService;
    private final DayInPackagesService dayInPackagesService;
    private final SchedulesService schedulesService;

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getPackageById(@PathVariable Long id) {
        try {
            PackagesDetailsDto packagesDetailsDto = packagesService.getPackagesById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy thông tin gói tour", packagesDetailsDto)
            );
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @GetMapping("/{id}/bookingList")
    ResponseEntity<ResponseObject> getBookingListPackageById(@PathVariable Long id) {
        try {
            List<BookingsBasicDto> basicDtoList = packagesService.getBookingList(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy danh sách booking gói tour thành công", basicDtoList)
            );
        } catch (NotFoundException | NoContentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }


    @PostMapping("")
    ResponseEntity<ResponseObject> addPackages(@RequestBody PackagesDetailsDto newPackageDto) {
        try {
            PackagesSummaryDto packagesSummaryDto = packagesService.addPackages(newPackageDto);
            if (packagesSummaryDto == null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", "Thêm gói tour không thành công", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Thêm gói tour thành công", packagesSummaryDto)
            );
        } catch (ScheduleException | NotFoundException | InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> editPackages(@RequestBody PackagesDetailsDto packagesDetailsDto, @PathVariable Long id) {
        try {
            PackagesSummaryDto packagesSummaryDto = packagesService.editPackages(id, packagesDetailsDto);
            if (packagesSummaryDto == null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", "Sửa gói tour không thành công", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Sửa gói tour thành công", packagesSummaryDto)
            );
        } catch (ScheduleException | InputException | NotFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deletePackages(@PathVariable Long id) {
        packagesService.deletePackages(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Xoá gói tour thành công", null)
        );
    }

    @PostMapping("/{packageId}")
    ResponseEntity<ResponseObject> addDays(@RequestBody DayInPackagesDetailsDto newDaysDto,
                                           @PathVariable Long packageId) {
        try {
            DayInPackagesSummaryDto dayInPackagesDetailsDto = dayInPackagesService.addDayInPackages(packageId, newDaysDto);
            if (dayInPackagesDetailsDto == null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", "Thêm ngày không thành công", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Thêm ngày thành công", dayInPackagesDetailsDto)
            );
        } catch (NotFoundException | ScheduleException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }

    }

    @PutMapping("/{packagedId}/{dayId}")
    ResponseEntity<ResponseObject> editDays(@RequestBody DayInPackagesDetailsDto newDaysDto,
                                            @PathVariable Long packagedId,
                                            @PathVariable Long dayId) {
        try {
            DayInPackagesSummaryDto dayInPackagesDetailsDto = dayInPackagesService.editDayInPackages(packagedId, dayId, newDaysDto);
            if (dayInPackagesDetailsDto == null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", "Sửa ngày không thành công", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Sửa ngày thành công", dayInPackagesDetailsDto)
            );
        } catch (ScheduleException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/{packagedId}/{dayId}")
    ResponseEntity<ResponseObject> deleteDays(@PathVariable Long packagedId,
                                              @PathVariable Long dayId) {
        dayInPackagesService.deleteDay(dayId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Xoá ngày thành công", null)
        );
    }

    @PostMapping("/{packagedId}/{dayId}")
    ResponseEntity<ResponseObject> addSchedules(@RequestBody SchedulesDetailsDto newSchedulesDetailsDto,
                                                @PathVariable Long packagedId,
                                                @PathVariable Long dayId) {
        try {
            SchedulesDetailsDto schedulesDetailsDto = schedulesService.addScheduels(dayId, newSchedulesDetailsDto);
            if (schedulesDetailsDto == null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("error", "Thêm lich trình không thành công", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Thêm lịch trình thành công", schedulesDetailsDto)
            );
        } catch (NotFoundException | InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @PutMapping("/{packagedId}/{dayId}/{scheduleId}")
    ResponseEntity<ResponseObject> editSchedules(@RequestBody SchedulesDetailsDto newSchedulesDetailsDto,
                                                 @PathVariable Long packagedId,
                                                 @PathVariable Long dayId,
                                                 @PathVariable Long scheduleId) {
        SchedulesDetailsDto schedulesDetailsDto = schedulesService.editSchedules(dayId, newSchedulesDetailsDto);
        if (schedulesDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Sửa lịch trình không thành công", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Sửa lịch trình thành công", schedulesDetailsDto)
        );
    }

    @DeleteMapping("/{packagedId}/{dayId}/{scheduleId}")
    ResponseEntity<ResponseObject> deleteSchedules(@PathVariable Long packagedId,
                                                   @PathVariable Long dayId,
                                                   @PathVariable Long scheduleId) {
        schedulesService.deleteSchedule(scheduleId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Xoá lịch trình thành công", null)
        );
    }

}
