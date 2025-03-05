package com.tourbooking.service;

import com.tourbooking.dto.DayInPackages.DayInPackagesDetailsDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesSummaryDto;

public interface DayInPackagesService {
    DayInPackagesSummaryDto addDayInPackages(Long packageId, DayInPackagesDetailsDto dayInPackagesDetailsDto);
    DayInPackagesSummaryDto editDayInPackages(Long packageId, Long dayId, DayInPackagesDetailsDto dayInPackagesDetailsDto);
    void deleteDay(Long id);
}
