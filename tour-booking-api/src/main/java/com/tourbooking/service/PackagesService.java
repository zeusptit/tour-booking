package com.tourbooking.service;

import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesStatisticsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PackagesService {
    PackagesSummaryDto addPackages(PackagesDetailsDto packagesDetailsDto) throws SecurityException;
    PackagesSummaryDto editPackages(Long id, PackagesDetailsDto packagesDetailsDto);
    List<PackagesBasicDto> getAllPackages();
    PackagesDetailsDto getPackagesById(Long id);
    PackagesDetailsDto getPackagesBySlug(String slug);
    void deletePackages(Long id);
    List<PackagesSummaryDto> searchPackages(Long cityId, String startDate, Long available, Long minCost, Long maxCost );
    List<PackagesSummaryDto> findThreeNearestPackage();
    Page<PackagesBasicDto> searchPackages(String keyword, int page);
    PackagesStatisticsDto getPackageStats();
    Page<PackagesBasicDto> searchTourguidePackages(Long aLong, String keyword, int page);
    List<BookingsBasicDto> getBookingList(Long id);
}
