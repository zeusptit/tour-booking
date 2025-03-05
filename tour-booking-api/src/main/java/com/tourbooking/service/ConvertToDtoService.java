package com.tourbooking.service;

import com.tourbooking.dto.Admin.AdminDetailsDto;
import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.Booking.BookingsDetailsDto;
import com.tourbooking.dto.Booking.BookingsSummaryDto;
import com.tourbooking.dto.Cities.CitiesDetailsDto;
import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.dto.Customer.CustomerBasicDto;
import com.tourbooking.dto.Customer.CustomerDetailsDto;
import com.tourbooking.dto.Customer.CustomerSummaryDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesDetailsDto;
import com.tourbooking.dto.DayInPackages.DayInPackagesSummaryDto;
import com.tourbooking.dto.Destinations.DestinationBasicDto;
import com.tourbooking.dto.Destinations.DestinationSimpleDto;
import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.dto.Destinations.DestinationsSummaryDto;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.dto.Schedules.SchedulesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesBasicDto;
import com.tourbooking.dto.TourGuides.TourGuidesSummaryDto;
import com.tourbooking.dto.Vouchers.VouchersBasicDto;
import com.tourbooking.dto.Vouchers.VouchersDetailsDto;
import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import com.tourbooking.model.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ConvertToDtoService {
    AdminDetailsDto toAdminDetailsDto(Admin admin);

    BookingsDetailsDto toBookingsDetailsDto(Bookings bookings);
    BookingsBasicDto toBookingsBasicDto(Bookings bookings);
    BookingsSummaryDto toBookingsSummaryDto(Bookings bookings);
    List<BookingsSummaryDto> toBookingsSummaryDtoList(List<Bookings> bookingsList);
    List<BookingsBasicDto> toBookingsBasicDtoList(List<Bookings> bookingsList);
    List<BookingsDetailsDto> toBookingsDetailsDtoList(List<Bookings> bookingsList);
    Page<BookingsSummaryDto> toBookingsSummaryDtoList(Page<Bookings> bookingsPage);
    Page<BookingsBasicDto> toBookingsBasicDtoList(Page<Bookings> bookingsPage);

    CitiesDetailsDto toCitiesDetailsDto(Cities cities);
    CitiesSummaryDto toCitiesSummaryDto(Cities cities);
    List<CitiesSummaryDto> toCitiesSummaryListDto(List<Cities> cities);

    CustomerSummaryDto toCustomerSummaryDto(Customers customers);
    CustomerDetailsDto toCustomerDetailsDto(Customers customers);
    CustomerBasicDto toCustomerBasicDto(Customers customers);
    List<CustomerDetailsDto> toCustomerDetailsDtoList(List<Customers> customersList);
    List<CustomerSummaryDto> toCustomerSummaryDtoList(List<Customers> customersList);
    Page<CustomerSummaryDto> toCustomerSummaryDtoPage(Page<Customers> customersPage);


    DayInPackagesDetailsDto toDayInPackagesDetailsDto(DayInPackages dayInPackages);
    DayInPackagesSummaryDto toDayInPackagesSummaryDto(DayInPackages dayInPackages);
    List<DayInPackagesDetailsDto> toDayInPackagesDetailsDtoList(List<DayInPackages> dayInPackages);

    DestinationsSummaryDto toDestinationsSummaryDto(Destinations destinations);
    DestinationBasicDto toDestinationBasicDto(Destinations destinations);
    DestinationSimpleDto toDestinationSimpleDto(Destinations destinations);
    List<DestinationsSummaryDto> toDestinationsSummaryDtoList(List<Destinations> destinationsList);
    List<DestinationSimpleDto> toDestinationsSimpleDto(List<Destinations> allAndDeletedFalse);
    DestinationsDetailsDto toDestinationsDetailsDto(Destinations destinations);
    List<DestinationsDetailsDto> toDestinationsDetailsDtoList(List<Destinations> destinationsList);
    Page<DestinationsDetailsDto> toDestinationsDetailsDtoPage(Page<Destinations> destinationsPage);
    Page<DestinationsSummaryDto> toDestinationsSummaryDtoPage(Page<Destinations> destinationsPage);
    Page<DestinationBasicDto> toDestinationBasicDtoPage(Page<Destinations> destinationsPage);

    PackagesDetailsDto toPackagesDetailsDto(Packages packages);
    PackagesBasicDto toPackagesBasicDto(Packages packages);
    PackagesSummaryDto toPackagesSummaryDto(Packages packages);
    List<PackagesSummaryDto> toPackagesSummaryDtoList(List<Packages> packagesList);
    List<PackagesBasicDto> toPackagesBasicDtoList(List<Packages> packagesList);
    Page<PackagesBasicDto> toPackagesBasicDtoPage(Page<Packages> packagesPage);


    PackagesDetailsDto convertPackagesForTG(Packages packages);
    List<PackagesDetailsDto> convertPackagesListForTG (List<Packages> packagesList);

    List<BookingsDetailsDto> convertBookingsListForCustomer (List<Bookings> bookingList);

    SchedulesDetailsDto toSchedulesDetailsDto(Schedules schedules);
    List<SchedulesDetailsDto> toSchedulesDetailsDtoList(List<Schedules> schedulesList);

    TourGuidesBasicDto toTourGuidesBasic(TourGuides tourGuides);
    TourGuidesSummaryDto toTourGuidesSummaryDto(TourGuides tourGuides);
    List<TourGuidesSummaryDto> toTourGuidesSummaryDtoList(List<TourGuides> tourGuidesList);
    Page<TourGuidesSummaryDto> toTourGuidesSummaryDtoPage(Page<TourGuides> tourGuidesPage);

    VouchersDetailsDto toVouchersDetailsDto(Vouchers vouchers);
    List<VouchersDetailsDto> toVouchersDetailsDtoList(List<Vouchers> vouchersList);
    VouchersBasicDto toVouchersBasicDto(Vouchers vouchers);
    VouchersSummaryDto toVouchersSummaryDto(Vouchers vouchers);
    List<VouchersSummaryDto> toVouchersSummaryDtoList(List<Vouchers> vouchersList);
    Page<VouchersSummaryDto> toVouchersSummaryDtoPage(Page<Vouchers> vouchersPage);


}
