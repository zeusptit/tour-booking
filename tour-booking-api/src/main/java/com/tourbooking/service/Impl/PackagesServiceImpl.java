package com.tourbooking.service.Impl;

import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesStatisticsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.exception.ScheduleException;
import com.tourbooking.model.*;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackagesServiceImpl implements PackagesService {
    @Autowired
    private PackagesRepository packagesRepository;
    @Autowired
    private TourGuidesService tourGuidesService;
    @Autowired
    private TourGuidesRepository tourGuidesRepository;
    @Autowired
    private DayInPackagesService dayInPackagesService;
    @Autowired
    private ConvertToDtoService toDtoService;

    @Override
    public PackagesSummaryDto addPackages(PackagesDetailsDto packagesDetailsDto) throws ScheduleException{
        TourGuides tourGuides = tourGuidesRepository
                .findById(packagesDetailsDto.getTourGuidesDto().getId()).orElse(null);
        if (tourGuides == null) throw new NotFoundException("Không tồn tại hướng dẫn viên");
        List<Packages> packagesList = packagesRepository.findPackagesByTourGuidesAndDeletedFalse(tourGuides);
        LocalDate start = LocalDate.parse(packagesDetailsDto.getStartDate());
        LocalDate end = LocalDate.parse(packagesDetailsDto.getEndDate());
        if (start.isAfter(end)) throw new InputException("Ngày bắt đầu phải trước ngày kết thúc");
        for (Packages p : packagesList) {
            if (!(p.getEndDate().isBefore(start) || p.getStartDate().isAfter(end)))
                throw new ScheduleException("Trùng lịch hướng dẫn viên");
        }
        if (packagesDetailsDto.getCost() <= 0) throw new InputException("Giá tour phải lớn hơn 0");
        if (packagesDetailsDto.getCapacity() <= 0)
            throw new InputException("Số lượng người trong tour phải lớn hơn 0");
        Random random = new Random();
        String slug = SlugService.generateSlug(packagesDetailsDto.getName()) + "-" + random.nextInt(101);
        Packages packages = Packages.builder()
                .name(packagesDetailsDto.getName())
                .capacity(packagesDetailsDto.getCapacity())
                .available(packagesDetailsDto.getCapacity())
                .cost(packagesDetailsDto.getCost())
                .description(packagesDetailsDto.getDescription())
                .startDate(start)
                .endDate(end)
                .slug(slug)
                .tourGuides(tourGuides)
                .build();
        return toDtoService.toPackagesSummaryDto(packagesRepository.save(packages));
    }

    @Override
    public PackagesSummaryDto editPackages(Long id, PackagesDetailsDto packagesDetailsDto) {
        Packages packages = packagesRepository.findById(id).orElse(null);
        if (packages == null) return addPackages(packagesDetailsDto);
        else {
            TourGuides tourGuides = tourGuidesRepository
                    .findById(packagesDetailsDto.getTourGuidesDto().getId()).orElse(null);
            if (tourGuides == null) throw new NotFoundException("Không tồn tại hướng dẫn viên");
            List<Packages> packagesList = packagesRepository.findPackagesByTourGuidesAndDeletedFalse(tourGuides);
            LocalDate start = LocalDate.parse(packagesDetailsDto.getStartDate());
            LocalDate end = LocalDate.parse(packagesDetailsDto.getEndDate());
            if (start.isAfter(end)) throw new InputException("Ngày bắt đầu phải trước ngày kết thúc");
            for (Packages p : packagesList) {
                if (!p.getId().equals(id)
                        &&(!(p.getEndDate().isBefore(start) || p.getStartDate().isAfter(end))))
                    throw new ScheduleException("Trùng lịch hướng dẫn viên");
            }
            if (packagesDetailsDto.getCost() <= 0) throw new InputException("Giá tour phải lớn hơn 0");
            if (packagesDetailsDto.getCapacity() <= 0)
                throw new InputException("Số lượng người trong tour phải lớn hơn 0");
            if (packagesDetailsDto.getCapacity() < (packages.getCapacity() - packages.getAvailable()))
                throw new InputException("Số lượng người trong tour phải lớn hơn số người đã đặt");
            packages.setName(packagesDetailsDto.getName());
            // chú ý khi sửa capacity, check với availalbe
            packages.setAvailable(packages.getAvailable() - (packages.getCapacity() - packagesDetailsDto.getCapacity()));
            packages.setCapacity(packagesDetailsDto.getCapacity());
            packages.setCost(packagesDetailsDto.getCost());
            packages.setDescription(packagesDetailsDto.getDescription());
            packages.setStartDate(LocalDate.parse(packagesDetailsDto.getStartDate()));
            packages.setEndDate(LocalDate.parse(packagesDetailsDto.getEndDate()));
            packages.setTourGuides(tourGuidesRepository.findById(packagesDetailsDto.getTourGuidesDto().getId()).orElse(null));
            return toDtoService.toPackagesSummaryDto(packagesRepository.save(packages));
        }
    }

    @Override
    public List<PackagesBasicDto> getAllPackages() {
        List<Packages> packagesList = packagesRepository.findAll();
        if (packagesList.isEmpty())
            throw new NoContentException("Không tìm thấy gói tour nào");
        return toDtoService.toPackagesBasicDtoList(packagesList);
    }

    @Override
    public PackagesDetailsDto getPackagesById(Long id) {
        Packages packages = packagesRepository.findByIdAndDeletedFalse(id).orElse(null);
        if (packages == null)
            throw new NotFoundException("Không tồn tại gói tour id " + id);
        return toDtoService.toPackagesDetailsDto(packages);
    }

    @Override
    public PackagesDetailsDto getPackagesBySlug(String slug) {
        Packages packages = packagesRepository.findBySlugAndDeletedFalse(slug).orElse(null);
        if (packages == null) return null;
        return toDtoService.toPackagesDetailsDto(packages);
    }

    @Override
    public void deletePackages(Long id) {
        packagesRepository.softDeleteById(id);
    }

    @Override
    public List<PackagesSummaryDto> searchPackages(Long cityId, String startDate, Long available, Long minCost, Long maxCost) {
        if (cityId == 0) return null;
        if (startDate.equals("0")) return null;
        LocalDate start = LocalDate.parse(startDate);
        List<Packages> packagesList = packagesRepository.findByCityIdAndStartDateAndAvailableAndCost(cityId, start, available, minCost, maxCost);
        return toDtoService.toPackagesSummaryDtoList(packagesList);
    }

    @Override
    public List<PackagesSummaryDto> findThreeNearestPackage() {
        List<Packages> packagesList = packagesRepository.findThreeNearestPackage();
        if (packagesList.isEmpty()) return null;
        return toDtoService.toPackagesSummaryDtoList(packagesList);
    }

    @Override
    public Page<PackagesBasicDto> searchPackages(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 6, Sort.by(Sort.Direction.DESC, "id"));
        Page<Packages> packagesPage = packagesRepository.findByNameContainingAndDeletedFalse(keyword, pageable);
        if (packagesPage.isEmpty())  throw new NoContentException("Không tìm thấy gói tour nào");
        return toDtoService.toPackagesBasicDtoPage(packagesPage);
    }

    @Override
    public PackagesStatisticsDto getPackageStats() {
        return PackagesStatisticsDto.builder()
                .packagesCount(packagesRepository.countByDeletedFalse())
                .available(packagesRepository.countAvailable())
                .upcoming(packagesRepository.countUpcomingPackages())
                .finished(packagesRepository.countFinishedPackages())
                .build();
    }

    @Override
    public Page<PackagesBasicDto> searchTourguidePackages(Long tourguideId, String keyword, int page) {
        TourGuides tourGuides = tourGuidesRepository.findById(tourguideId).orElse(null);
        if (tourGuides == null) throw new NotFoundException("Không tồn tại hướng dẫn viên");
        Pageable pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.DESC, "id"));
        Page<Packages> packagesPage = packagesRepository.
                findByNameContainingAndDeletedFalseAndTourGuides(keyword,tourGuides, pageable);
        if (packagesPage.isEmpty())  throw new NoContentException("Không tìm thấy gói tour nào");
        return toDtoService.toPackagesBasicDtoPage(packagesPage);
    }

    @Override
    public List<BookingsBasicDto> getBookingList(Long id) {
        Packages packages = packagesRepository.findByIdAndDeletedFalse(id).orElse(null);
        if (packages == null)
            throw new NotFoundException("Không tồn tại gói tour id " + id);
        if (packages.getBookingsList().isEmpty())
            throw new NoContentException("Không tìm thấy booking nào");
        return toDtoService.toBookingsBasicDtoList(packages.getBookingsList()
                .stream()
                .filter(bookings -> bookings.getPaymentStatus().equals(PaymentStatus.PAID))
                .collect(Collectors.toList())
        );
    }

//    private PackagesDetailsDto convertToDtoWithImageNoTG(Packages packages) {
//        String slug = SlugService.generateSlug(packages.getName()) + "-" + packages.getId();
//        if (packages.getSlug() == null) {
//            packages.setSlug(slug);
//            packagesRepository.save(packages);
//        }
//        String image1 = "2990cd55eec843f49da816e263607587.png";
//        List<String> imageList = new ArrayList<>();
//        for (DayInPackages dip : packages.getDayInPackagesList()) {
//            for (Schedules schedules: dip.getSchedulesList()) {
//                if (schedules.getDestinations() != null){
//                    image1 = schedules.getDestinations().getImage().getFirst();
//                    break;
//                }
//            }
//        }
//        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
//                .id(packages.getId())
//                .image1(image1)
//                .name(packages.getName())
//                .capacity(packages.getCapacity())
//                .available(packages.getAvailable())
//                .cost(packages.getCost())
//                .description(packages.getDescription())
//                .slug(slug)
//                .startDate(packages.getStartDate().toString())
//                .endDate(packages.getEndDate().toString())
//                //.tourGuidesDto(tourGuidesService.convertToDtoForPackage(packages.getTourGuides()))
//                //.dayList(dayInPackagesService.convertToListDto(packages.getDayInPackagesList()))
//                .build();
//        return packagesDetailsDto;
//    }

//    private PackagesDetailsDto convertToDto(Packages packages) {
//        String slug = SlugService.generateSlug(packages.getName()) + "-" + packages.getId();
//        if (packages.getSlug() == null) {
//            packages.setSlug(slug);
//            packagesRepository.save(packages);
//        }
//        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
//                .id(packages.getId())
//                .name(packages.getName())
//                .capacity(packages.getCapacity())
//                .available(packages.getAvailable())
//                .cost(packages.getCost())
//                .description(packages.getDescription())
//                .slug(slug)
//                .startDate(packages.getStartDate().toString())
//                .endDate(packages.getEndDate().toString())
//                //.tourGuidesDto(tourGuidesService.convertToDtoForPackage(packages.getTourGuides()))
//                .build();
//        return packagesDetailsDto;
//    }


//    private PackagesDetailsDto convertEntityToDto(Packages packages) {
//        String slug = SlugService.generateSlug(packages.getName()) + "-" + packages.getId();
//        if (packages.getSlug() == null) {
//            packages.setSlug(slug);
//            packagesRepository.save(packages);
//        }
//        List<String> imageList = new ArrayList<>();
//        List<String> imageHotelList = new ArrayList<>();
//        for (DayInPackages dip : packages.getDayInPackagesList()) {
//            for (Schedules schedules: dip.getSchedulesList()) {
//                if (schedules.getDestinations() != null){
//                    if (schedules.getDestinations().getDestinationType().equals(DestinationType.PLACES_OF_VISIT)) {
//                        imageList.addAll(schedules.getDestinations().getImage());
//                    } else {
//                        imageHotelList.addAll(schedules.getDestinations().getImage());
//                    }
//
//                }
//            }
//        }
//        if (imageList.isEmpty()) {
//            imageList.add("2990cd55eec843f49da816e263607587.png");
//        }
//        Collections.shuffle(imageList);
//        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
//                .id(packages.getId())
//                .name(packages.getName())
//                .capacity(packages.getCapacity())
//                .available(packages.getAvailable())
//                .cost(packages.getCost())
//                .description(packages.getDescription())
//                .slug(slug)
//                .startDate(packages.getStartDate().toString())
//                .endDate(packages.getEndDate().toString())
//                .imageList(imageList)
//                .imageHotelList(imageHotelList)
//                .tourGuidesDto(tourGuidesService.convertToDtoForPackage(packages.getTourGuides()))
//                .dayList(toDtoService.toDayInPackagesDetailsDtoList(packages.getDayInPackagesList()))
//                .build();
//        return packagesDetailsDto;
//    }
}
