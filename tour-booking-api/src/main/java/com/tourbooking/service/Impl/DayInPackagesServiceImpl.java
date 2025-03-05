package com.tourbooking.service.Impl;

import com.tourbooking.dto.DayInPackages.DayInPackagesDetailsDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesSummaryDto;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.exception.ScheduleException;
import com.tourbooking.model.DayInPackages;
import com.tourbooking.model.Packages;
import com.tourbooking.repository.DayInPackagesRepository;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.DayInPackagesService;
import com.tourbooking.service.SchedulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DayInPackagesServiceImpl implements DayInPackagesService {
    @Autowired
    private DayInPackagesRepository dayInPackagesRepository;
    @Autowired
    private PackagesRepository packagesRepository;
    @Autowired
    private ConvertToDtoService toDtoService;
    @Autowired
    private SchedulesService schedulesService;
    @Override
    public DayInPackagesSummaryDto addDayInPackages(Long packageId, DayInPackagesDetailsDto dayInPackagesDetailsDto) {
        Packages packages = packagesRepository.findByIdAndDeletedFalse(packageId).orElse(null);
        if (packages == null) throw new NotFoundException("Không tồn tại gói tour với id " + packageId);
        if (packages.getStartDate().isBefore(LocalDate.now()))
            throw new ScheduleException("Không thể thêm ngày do tour này đã diễn ra");
        LocalDate date = LocalDate.parse(dayInPackagesDetailsDto.getDate());
        if (date.isBefore(packages.getStartDate()) || date.isAfter(packages.getEndDate()))
            throw new ScheduleException("Thời gian phải lớn hơn ngày bắt đầu và nhỏ hơn ngày kết thúc");
        DayInPackages dayInPackages = DayInPackages.builder()
                .date(date)
                .name(dayInPackagesDetailsDto.getName())
                .packages(packages)
                .build();
        return toDtoService.toDayInPackagesSummaryDto(dayInPackagesRepository.save(dayInPackages));
    }

    @Override
    public DayInPackagesSummaryDto editDayInPackages(Long packageId, Long dayId, DayInPackagesDetailsDto dayInPackagesDetailsDto) {
        DayInPackages dayInPackages = dayInPackagesRepository.findById(dayId).orElse(null);
        if (dayInPackages == null) return addDayInPackages(packageId, dayInPackagesDetailsDto);
        Packages packages = dayInPackages.getPackages();
        LocalDate date = LocalDate.parse(dayInPackagesDetailsDto.getDate());
        if (date.isBefore(packages.getStartDate()) || date.isAfter(packages.getEndDate()))
            throw new ScheduleException("Thời gian phải lớn hơn ngày bắt đầu và nhỏ hơn ngày kết thúc");
        dayInPackages.setDate(LocalDate.parse(dayInPackagesDetailsDto.getDate()));
        dayInPackages.setName(dayInPackagesDetailsDto.getName());
        return toDtoService.toDayInPackagesSummaryDto(dayInPackagesRepository.save(dayInPackages));
    }

    @Override
    public void deleteDay(Long id) {
        dayInPackagesRepository.softDeleteById(id);
    }

//    @Override
//    public List<DayInPackagesDetailsDto> convertToListDto(List<DayInPackages> dayInPackages) {
//        if (dayInPackages == null) return null;
//        return dayInPackages.stream()
//                .map(this::convertEntityToDto)
//                .collect(Collectors.toList());
//    }


//    private DayInPackagesDetailsDto convertEntityToDto(DayInPackages dayInPackages) {
//        DayInPackagesDetailsDto dayInPackagesDetailsDto = DayInPackagesDetailsDto.builder()
//                .id(dayInPackages.getId())
//                .name(dayInPackages.getName())
//                .date(dayInPackages.getDate().toString())
//                .packagesId(dayInPackages.getPackages().getId())
//                .schedulesList(schedulesService.convertToListDto(dayInPackages.getSchedulesList()))
//                .build();
//        return dayInPackagesDetailsDto;
//    }
}
