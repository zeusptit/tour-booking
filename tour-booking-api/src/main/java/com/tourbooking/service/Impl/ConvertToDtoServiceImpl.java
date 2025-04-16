package com.tourbooking.service.Impl;

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
import com.tourbooking.service.ConvertToDtoService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConvertToDtoServiceImpl implements ConvertToDtoService {

    @Override
    public AdminDetailsDto toAdminDetailsDto(Admin admin) {
        AdminDetailsDto adminDetailsDto = AdminDetailsDto.builder()
                .id(admin.getId())
                .ho(admin.getHo())
                .ten(admin.getTen())
                .title(admin.getTitle())
                .email(admin.getUser().getEmail())
                .build();
        return adminDetailsDto;
    }

    @Override
    public BookingsDetailsDto toBookingsDetailsDto(Bookings bookings) {
        BookingsDetailsDto bookingsDetailsDto = BookingsDetailsDto.builder()
                .id(bookings.getId())
                .paymentStatus(bookings.getPaymentStatus())
                .subtotal(bookings.getSubtotal())
                .voucher(bookings.getVoucher())
                .member(bookings.getMember())
                .total(bookings.getTotal())
                .customers(toCustomerBasicDto(bookings.getCustomers()))
                .note(bookings.getNote())
                .code(bookings.getCode())
                .createAt(bookings.getCreatedAt().toString().replace("T", " "))
                .updateAt(bookings.getUpdateAt().toString().replace("T", " "))
                .numberOfPeople(bookings.getNumberOfPeople())
                .packages(toPackagesSummaryDto(bookings.getPackages()))
                .vouchers(bookings.getVouchers()!=null ? toVouchersBasicDto(bookings.getVouchers()):null)
                .pickup(bookings.isPickup())
                .build();
        return bookingsDetailsDto;
    }

    @Override
    public BookingsBasicDto toBookingsBasicDto(Bookings bookings) {
        BookingsBasicDto bookingsBasicDto = BookingsBasicDto.builder()
                .id(bookings.getId())
                .paymentStatus(bookings.getPaymentStatus())
                .total(bookings.getTotal())
                .note(bookings.getNote())
                .code(bookings.getCode())
                .createAt(bookings.getCreatedAt().toString().replace("T", " "))
                .build();
        return bookingsBasicDto;
    }

    @Override
    public BookingsSummaryDto toBookingsSummaryDto(Bookings bookings) {
        BookingsSummaryDto bookingsSummaryDto = BookingsSummaryDto.builder()
                .id(bookings.getId())
                .paymentStatus(bookings.getPaymentStatus())
                .subtotal(bookings.getSubtotal())
                .voucher(bookings.getVoucher())
                .member(bookings.getMember())
                .total(bookings.getTotal())
                .customers(toCustomerBasicDto(bookings.getCustomers()))
                .note(bookings.getNote())
                .code(bookings.getCode())
                .createAt(bookings.getCreatedAt().toString().replace("T", " "))
                .updateAt(bookings.getUpdateAt().toString().replace("T", " "))
                .numberOfPeople(bookings.getNumberOfPeople())
                .pickup(bookings.isPickup())
                .build();
        return bookingsSummaryDto;
    }

    @Override
    public List<BookingsSummaryDto> toBookingsSummaryDtoList(List<Bookings> bookingsList) {
        return bookingsList.stream()
                .map(this::toBookingsSummaryDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingsBasicDto> toBookingsBasicDtoList(List<Bookings> bookingsList) {
        return bookingsList.stream()
                .map(this::toBookingsBasicDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingsDetailsDto> toBookingsDetailsDtoList(List<Bookings> bookingsList) {
        return bookingsList.stream()
                .map(this::toBookingsDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<BookingsSummaryDto> toBookingsSummaryDtoList(Page<Bookings> bookingsPage) {
        return bookingsPage.map(this::toBookingsSummaryDto);
    }

    @Override
    public Page<BookingsBasicDto> toBookingsBasicDtoList(Page<Bookings> bookingsPage) {
        return bookingsPage.map(this::toBookingsBasicDto);
    }

    @Override
    public CitiesDetailsDto toCitiesDetailsDto(Cities cities) {
        return CitiesDetailsDto.builder()
                .id(cities.getId())
                .name(cities.getName())
                .description(cities.getDescription())
                .build();
    }

    @Override
    public CitiesSummaryDto toCitiesSummaryDto(Cities cities) {
        CitiesSummaryDto citiesSummaryDto = CitiesSummaryDto.builder()
                .id(cities.getId())
                .name(cities.getName())
                .build();
        return citiesSummaryDto;
    }

    @Override
    public CustomerSummaryDto toCustomerSummaryDto(Customers customers) {
        CustomerSummaryDto customerSummaryDto = CustomerSummaryDto.builder()
                .id(customers.getId())
                .ho(customers.getHo())
                .ten(customers.getTen())
                .membership(customers.getMembership())
                .phone(customers.getPhone())
                .email(customers.getUser().getEmail())
                .build();
        if (customers.getDob() != null) {
            customerSummaryDto.setDob(customers.getDob().toString());
        }
        return customerSummaryDto;
    }

    @Override
    public CustomerDetailsDto toCustomerDetailsDto(Customers customers) {
        CustomerDetailsDto customerDetailsDto = CustomerDetailsDto.builder()
                .id(customers.getId())
                .ho(customers.getHo())
                .ten(customers.getTen())
                .membership(customers.getMembership())
                .phone(customers.getPhone())
                .email(customers.getUser().getEmail())
                .bookingsList(convertBookingsListForCustomer(customers.getBookingsList()))
                .build();
        if (customers.getDob() != null) {
            customerDetailsDto.setDob(customers.getDob().toString());
        }
        return customerDetailsDto;
    }

    @Override
    public CustomerBasicDto toCustomerBasicDto(Customers customers) {
        CustomerBasicDto customerBasicDto = CustomerBasicDto.builder()
                .id(customers.getId())
                .ho(customers.getHo())
                .ten(customers.getTen())
                .membership(customers.getMembership())
                .build();
        return customerBasicDto;
    }

    @Override
    public List<CustomerDetailsDto> toCustomerDetailsDtoList(List<Customers> customersList) {
        return customersList.stream().map(this::toCustomerDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerSummaryDto> toCustomerSummaryDtoList(List<Customers> customersList) {
        return customersList.stream().map(this::toCustomerSummaryDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CustomerSummaryDto> toCustomerSummaryDtoPage(Page<Customers> customersPage) {
        return customersPage.map(this::toCustomerSummaryDto);
    }

    @Override
    public List<CitiesSummaryDto> toCitiesSummaryListDto(List<Cities> cities) {
        return cities.stream()
                .map(this::toCitiesSummaryDto)
                .collect(Collectors.toList());
    }


    @Override
    public DayInPackagesDetailsDto toDayInPackagesDetailsDto(DayInPackages dayInPackages) {
        DayInPackagesDetailsDto dayInPackagesDetailsDto = DayInPackagesDetailsDto.builder()
                .id(dayInPackages.getId())
                .name(dayInPackages.getName())
                .date(dayInPackages.getDate().toString())
                .packagesId(dayInPackages.getPackages().getId())
                .schedulesList(toSchedulesDetailsDtoList(dayInPackages.getSchedulesList()))
                .build();
        return dayInPackagesDetailsDto;
    }

    @Override
    public DayInPackagesSummaryDto toDayInPackagesSummaryDto(DayInPackages dayInPackages) {
        DayInPackagesSummaryDto dayInPackagesSummaryDto = DayInPackagesSummaryDto.builder()
                .id(dayInPackages.getId())
                .name(dayInPackages.getName())
                .date(dayInPackages.getDate().toString())
                .build();
        return dayInPackagesSummaryDto;
    }

    @Override
    public List<DayInPackagesDetailsDto> toDayInPackagesDetailsDtoList(List<DayInPackages> dayInPackagesList) {
        return dayInPackagesList.stream()
                .filter(dayInPackage -> !dayInPackage.isDeleted())
                .sorted(Comparator.comparing(DayInPackages::getDate))
                .map(this::toDayInPackagesDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public DestinationsSummaryDto toDestinationsSummaryDto(Destinations destinations) {
        if (destinations == null) return null;
        DestinationsSummaryDto destinationsSummaryDto = DestinationsSummaryDto.builder()
                .id(destinations.getId())
                .name(destinations.getName())
                .price(destinations.getPrice())
                .description(destinations.getDescription())
                .rate(destinations.getRate())
                .address(destinations.getAddress())
                .image(destinations.getImage().getFirst())
                .slug(destinations.getSlug())
                .destinationType(destinations.getDestinationType())
                .build();
        return destinationsSummaryDto;
    }

    @Override
    public DestinationBasicDto toDestinationBasicDto(Destinations destinations) {
        if (destinations == null) return null;
        DestinationBasicDto destinationBasicDto = DestinationBasicDto.builder()
                .id(destinations.getId())
                .name(destinations.getName())
                .price(destinations.getPrice())
                .rate(destinations.getRate())
                .address(destinations.getAddress())
                .image(destinations.getImage().getFirst())
                .slug(destinations.getSlug())
                .city(toCitiesSummaryDto(destinations.getCities()))
                .build();
        return destinationBasicDto;
    }
    @Override
    public DestinationSimpleDto toDestinationSimpleDto(Destinations destinations) {
        if (destinations == null) return null;
        String prefix = "Khách sạn ";
        if (destinations.getDestinationType().equals(DestinationType.PLACES_OF_VISIT))
            prefix = "Điểm đến ";
        DestinationSimpleDto destinationSimpleDto = DestinationSimpleDto.builder()
                .id(destinations.getId())
                .name(prefix + destinations.getName() + " - " + destinations.getCities().getName())
                .build();
        return destinationSimpleDto;
    }
    @Override
    public List<DestinationsSummaryDto> toDestinationsSummaryDtoList(List<Destinations> destinationsList) {
        return destinationsList
                .stream()
                .map(this::toDestinationsSummaryDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<DestinationSimpleDto> toDestinationsSimpleDto(List<Destinations> allAndDeletedFalse) {
        return allAndDeletedFalse
                .stream()
                .map(this::toDestinationSimpleDto)
                .collect(Collectors.toList());
    }
    @Override
    public DestinationsDetailsDto toDestinationsDetailsDto(Destinations destinations) {
        if (destinations == null) return null;
        DestinationsDetailsDto destinationsDetailsDto = DestinationsDetailsDto.builder()
                .id(destinations.getId())
                .name(destinations.getName())
                .price(destinations.getPrice())
                .description(destinations.getDescription())
                .rate(destinations.getRate())
                .address(destinations.getAddress())
                .image(destinations.getImage())
                .slug(destinations.getSlug())
                .destinationType(destinations.getDestinationType())
                .cityId(destinations.getCities().getId())
                .cityName(destinations.getCities().getName())
                .city(toCitiesSummaryDto(destinations.getCities()))
                .build();
        return destinationsDetailsDto;
    }

    @Override
    public List<DestinationsDetailsDto> toDestinationsDetailsDtoList(List<Destinations> destinationsList) {
        return destinationsList
                .stream()
                .map(this::toDestinationsDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<DestinationsDetailsDto> toDestinationsDetailsDtoPage(Page<Destinations> destinationsPage) {
        return destinationsPage.map(this::toDestinationsDetailsDto);
    }

    @Override
    public Page<DestinationsSummaryDto> toDestinationsSummaryDtoPage(Page<Destinations> destinationsPage) {
        return destinationsPage.map(this::toDestinationsSummaryDto);
    }

    @Override
    public Page<DestinationBasicDto> toDestinationBasicDtoPage(Page<Destinations> destinationsPage) {
        return destinationsPage.map(this::toDestinationBasicDto);
    }

    @Override
    public PackagesDetailsDto toPackagesDetailsDto(Packages packages) {
        List<String> imageList = new ArrayList<>();
        List<String> imageHotelList = new ArrayList<>();
        for (DayInPackages dip : packages.getDayInPackagesList()) {
            for (Schedules schedules: dip.getSchedulesList()) {
                if (schedules.getDestinations() != null){
                    if (schedules.getDestinations().getDestinationType().equals(DestinationType.PLACES_OF_VISIT)) {
                        imageList.addAll(schedules.getDestinations().getImage());
                    } else {
                        imageHotelList.addAll(schedules.getDestinations().getImage());
                    }

                }
            }
        }
        if (imageList.isEmpty()) {
            imageList.add("logo.png");
        }
        Collections.shuffle(imageList);
        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
                .id(packages.getId())
                .name(packages.getName())
                .capacity(packages.getCapacity())
                .available(packages.getAvailable())
                .cost(packages.getCost())
                .description(packages.getDescription())
                .slug(packages.getSlug())
                .startDate(packages.getStartDate().toString())
                .endDate(packages.getEndDate().toString())
                .imageList(imageList)
                .imageHotelList(imageHotelList)
                .tourGuidesDto(toTourGuidesBasic(packages.getTourGuides()))
                .dayList(toDayInPackagesDetailsDtoList(packages.getDayInPackagesList()))
                .build();
        return packagesDetailsDto;
    }

    @Override
    public PackagesBasicDto toPackagesBasicDto(Packages packages) {
        PackagesBasicDto packagesBasicDto = PackagesBasicDto.builder()
                .id(packages.getId())
                .name(packages.getName())
                .capacity(packages.getCapacity())
                .available(packages.getAvailable())
                .cost(packages.getCost())
                .description(packages.getDescription())
                .slug(packages.getSlug())
                .startDate(packages.getStartDate().toString())
                .endDate(packages.getEndDate().toString())
                .build();
        return packagesBasicDto;
    }

    @Override
    public PackagesSummaryDto toPackagesSummaryDto(Packages packages) {
        String image1 = "logo.png";
        List<String> imageList = new ArrayList<>();
        if (packages.getDayInPackagesList() != null) {
            for (DayInPackages dip : packages.getDayInPackagesList()) {
                for (Schedules schedules: dip.getSchedulesList()) {
                    if (schedules.getDestinations() != null){
                        image1 = schedules.getDestinations().getImage().getFirst();
                        break;
                    }
                }
            }
        }
        return PackagesSummaryDto.builder()
                .id(packages.getId())
                .image1(image1)
                .name(packages.getName())
                .capacity(packages.getCapacity())
                .available(packages.getAvailable())
                .cost(packages.getCost())
                .description(packages.getDescription())
                .slug(packages.getSlug())
                .startDate(packages.getStartDate().toString())
                .endDate(packages.getEndDate().toString())
                .build();
    }

    @Override
    public List<PackagesSummaryDto> toPackagesSummaryDtoList(List<Packages> packagesList) {
        return packagesList.stream().
                map(this::toPackagesSummaryDto).collect(Collectors.toList());
    }

    @Override
    public List<PackagesBasicDto> toPackagesBasicDtoList(List<Packages> packagesList) {
        return packagesList.stream()
                .map(this::toPackagesBasicDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PackagesBasicDto> toPackagesBasicDtoPage(Page<Packages> packagesPage) {
        return packagesPage.map(this::toPackagesBasicDto);
    }


    @Override
    public PackagesDetailsDto convertPackagesForTG(Packages packages) {
        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
                .id(packages.getId())
                .name(packages.getName())
                .capacity(packages.getCapacity())
                .available(packages.getAvailable())
                .cost(packages.getCost())
                .description(packages.getDescription())
                .startDate(packages.getStartDate().toString())
                .endDate(packages.getEndDate().toString())
                //.tourGuidesDto(tourGuidesService.convertToDtoForPackage(packages.getTourGuides()))
                .build();
        return packagesDetailsDto;
    }

    @Override
    public List<PackagesDetailsDto> convertPackagesListForTG (List<Packages> packagesList) {
        if (packagesList == null) return null;
        return packagesList.stream()
                .filter(packages -> !packages.isDeleted())
                .map(this::convertPackagesForTG)
                .collect(Collectors.toList());

    }

    public BookingsDetailsDto convertBookingsForCustomer(Bookings bookings) {

        BookingsDetailsDto bookingsDetailsDto = BookingsDetailsDto.builder()
                .id(bookings.getId())
                .paymentStatus(bookings.getPaymentStatus())
                .total(bookings.getTotal())
                .code(bookings.getCode())
                .createAt(bookings.getCreatedAt().toString().replace("T", " "))
                .numberOfPeople(bookings.getNumberOfPeople())
                .build();
        return bookingsDetailsDto;
    }
    @Override
    public List<BookingsDetailsDto> convertBookingsListForCustomer(List<Bookings> bookingList) {
        if (bookingList == null) return null;
        return bookingList.stream()
                .map(this::convertBookingsForCustomer)
                .collect(Collectors.toList());
    }

    @Override
    public SchedulesDetailsDto toSchedulesDetailsDto(Schedules schedules) {
        return SchedulesDetailsDto.builder()
                .id(schedules.getId())
                .name(schedules.getName())
                .description(schedules.getDescription())
                .startTime(schedules.getStartTime())
                .endTime(schedules.getEndTime())
                .daysId(schedules.getDayInPackages().getId())
                .des(toDestinationsDetailsDto(schedules.getDestinations()))
                .build();
    }

    @Override
    public List<SchedulesDetailsDto> toSchedulesDetailsDtoList(List<Schedules> schedulesList) {
        if (schedulesList == null) return null;
        return schedulesList.stream()
                .filter(schedules -> !schedules.isDeleted())
                .sorted(Comparator.comparing(schedules -> LocalTime.parse(schedules.getStartTime())))
                .map(this::toSchedulesDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public TourGuidesBasicDto toTourGuidesBasic(TourGuides tourGuides) {
        if (tourGuides == null) return null;
        TourGuidesBasicDto tourGuidesBasicDto = TourGuidesBasicDto.builder()
                .id(tourGuides.getId())
                .ho(tourGuides.getHo())
                .ten(tourGuides.getTen())
                .phone(tourGuides.getPhone())
                .build();
        if (tourGuides.getDob() != null){
            tourGuidesBasicDto.setDob(tourGuides.getDob().toString());
        }
        return tourGuidesBasicDto;
    }

    @Override
    public TourGuidesSummaryDto toTourGuidesSummaryDto(TourGuides tourGuides) {
        if (tourGuides == null) return null;
        TourGuidesSummaryDto tourGuidesSummaryDto = TourGuidesSummaryDto.builder()
                .id(tourGuides.getId())
                .ho(tourGuides.getHo())
                .ten(tourGuides.getTen())
                .phone(tourGuides.getPhone())
                .salary(tourGuides.getSalary())
                .email(tourGuides.getUser().getEmail())
                .build();
        if (tourGuides.getDob() != null){
            tourGuidesSummaryDto.setDob(tourGuides.getDob().toString());
        }
        return tourGuidesSummaryDto;
    }

    @Override
    public List<TourGuidesSummaryDto> toTourGuidesSummaryDtoList(List<TourGuides> tourGuidesList) {
        return tourGuidesList.stream()
                .map(this::toTourGuidesSummaryDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<TourGuidesSummaryDto> toTourGuidesSummaryDtoPage(Page<TourGuides> tourGuidesPage) {
        return tourGuidesPage.map(this::toTourGuidesSummaryDto);
    }

    @Override
    public VouchersDetailsDto toVouchersDetailsDto(Vouchers vouchers) {
        VouchersDetailsDto vouchersDetailsDto = VouchersDetailsDto.builder()
                .id(vouchers.getId())
                .name(vouchers.getName())
                .amount(vouchers.getAmount())
                .code(vouchers.getCode())
                .percent(vouchers.getPercent())
                .endTime(vouchers.getEndTime().toString())
                .startTime(vouchers.getStartTime().toString())
                .bookingsList(toBookingsBasicDtoList(vouchers.getBookingsList()))
                .build();
        return vouchersDetailsDto;
    }

    @Override
    public List<VouchersDetailsDto> toVouchersDetailsDtoList(List<Vouchers> vouchersList) {
        return vouchersList.stream()
                .map(this::toVouchersDetailsDto)
                .collect(Collectors.toList());
    }

    @Override
    public VouchersBasicDto toVouchersBasicDto(Vouchers vouchers) {
        VouchersBasicDto vouchersBasicDto = VouchersBasicDto.builder()
                .id(vouchers.getId())
                .code(vouchers.getCode())
                .percent(vouchers.getPercent())
                .build();
        return vouchersBasicDto;
    }

    @Override
    public VouchersSummaryDto toVouchersSummaryDto(Vouchers vouchers) {
        VouchersSummaryDto vouchersSummaryDto = VouchersSummaryDto.builder()
                .id(vouchers.getId())
                .name(vouchers.getName())
                .amount(vouchers.getAmount())
                .code(vouchers.getCode())
                .percent(vouchers.getPercent())
                .endTime(vouchers.getEndTime().toString())
                .startTime(vouchers.getStartTime().toString())
                .build();
        return vouchersSummaryDto;
    }

    @Override
    public List<VouchersSummaryDto> toVouchersSummaryDtoList(List<Vouchers> vouchersList) {
       return vouchersList.stream()
               .map(this::toVouchersSummaryDto)
               .collect(Collectors.toList());
    }

    @Override
    public Page<VouchersSummaryDto> toVouchersSummaryDtoPage(Page<Vouchers> vouchersPage) {
        return vouchersPage.map(this::toVouchersSummaryDto);
    }
}
