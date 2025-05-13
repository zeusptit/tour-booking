package com.tourbooking.setup;

import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.Packages.PackagesStatisticsDto;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.dto.TourGuides.TourGuidesBasicDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.exception.ScheduleException;
import com.tourbooking.model.Packages;
import com.tourbooking.model.TourGuides;
import com.tourbooking.model.Bookings;
import com.tourbooking.model.PaymentStatus;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.DayInPackagesService;
import com.tourbooking.service.Impl.PackagesServiceImpl;
import com.tourbooking.service.TourGuidesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;


import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;


public class PackagesServiceImplTest {

    @InjectMocks
    private PackagesServiceImpl packagesService;

    @Mock
    private PackagesRepository packagesRepository;

    @Mock
    private TourGuidesRepository tourGuidesRepository;

    @Mock
    private ConvertToDtoService toDtoService;

    @Mock
    private TourGuidesService tourGuidesService;

    @Mock
    private DayInPackagesService dayInPackagesService;

    private TourGuides guide;
    private PackagesDetailsDto detailsDto;
    private Packages packageEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        guide = TourGuides.builder().id(1L).build();

        detailsDto = PackagesDetailsDto.builder()
                .name("Tour Đà Lạt")
                .capacity(10L)
                .cost(2000000L)
                .description("Đi Đà Lạt 3 ngày 2 đêm")
                .startDate(LocalDate.now().plusDays(1).toString())
                .endDate(LocalDate.now().plusDays(3).toString())
                .tourGuidesDto(TourGuidesBasicDto.builder().id(1L).build())
                .build();

        packageEntity = Packages.builder()
                .id(1L)
                .name("Tour Đà Lạt")
                .capacity(10L)
                .available(10L)
                .cost(2000000L)
                .description("Đi Đà Lạt 3 ngày 2 đêm")
                .startDate(LocalDate.parse(detailsDto.getStartDate()))
                .endDate(LocalDate.parse(detailsDto.getEndDate()))
                .tourGuides(guide)
                .build();
    }

    @Test
    void addPackages_Success() {
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());
        when(packagesRepository.save(any(Packages.class))).thenReturn(packageEntity);
        when(toDtoService.toPackagesSummaryDto(any(Packages.class)))
                .thenReturn(PackagesSummaryDto.builder().id(1L).name("Tour Đà Lạt").build());

        PackagesSummaryDto result = packagesService.addPackages(detailsDto);

        assertNotNull(result);
        assertEquals("Tour Đà Lạt", result.getName());
    }

    @Test
    void addPackages_TourGuideNotFound_ThrowsException() {
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            packagesService.addPackages(detailsDto);
        });

        assertEquals("Không tồn tại hướng dẫn viên", exception.getMessage());
    }

    @Test
    void addPackages_InvalidDate_ThrowsInputException() {
        detailsDto.setStartDate(LocalDate.now().plusDays(5).toString());
        detailsDto.setEndDate(LocalDate.now().plusDays(2).toString());
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));

        assertThrows(InputException.class, () -> packagesService.addPackages(detailsDto));
    }

    @Test
    void addPackages_ScheduleConflict_ThrowsScheduleException() {
        Packages existing = Packages.builder()
                .startDate(LocalDate.now().plusDays(1))
                .endDate(LocalDate.now().plusDays(5))
                .build();
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(List.of(existing));

        assertThrows(ScheduleException.class, () -> packagesService.addPackages(detailsDto));
    }

    @Test
    void addPackages_InvalidCost_ThrowsInputException() {
        detailsDto.setCost(0L);
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));

        assertThrows(InputException.class, () -> packagesService.addPackages(detailsDto));
    }

    @Test
    void addPackages_InvalidCapacity_ThrowsInputException() {
        detailsDto.setCapacity(-1L);
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));

        assertThrows(InputException.class, () -> packagesService.addPackages(detailsDto));
    }
    @Test
    void editPackages_WhenPackageNotFound_ShouldAddNew() {
        when(packagesRepository.findById(1L)).thenReturn(Optional.empty());
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());
        when(packagesRepository.save(any(Packages.class))).thenReturn(packageEntity);
        when(toDtoService.toPackagesSummaryDto(any(Packages.class)))
                .thenReturn(PackagesSummaryDto.builder().id(1L).name("Tour Đà Lạt").build());

        PackagesSummaryDto result = packagesService.editPackages(1L, detailsDto);

        assertNotNull(result);
        assertEquals("Tour Đà Lạt", result.getName());
    }

    @Test
    void editPackages_WhenTourGuideNotFound_ShouldThrowException() {
        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () ->
                packagesService.editPackages(1L, detailsDto));

        assertEquals("Không tồn tại hướng dẫn viên", exception.getMessage());
    }

    @Test
    void editPackages_WhenStartDateAfterEndDate_ShouldThrowInputException() {
        detailsDto.setStartDate(LocalDate.now().plusDays(5).toString());
        detailsDto.setEndDate(LocalDate.now().plusDays(2).toString());

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());

        assertThrows(InputException.class, () ->
                packagesService.editPackages(1L, detailsDto));
    }

    @Test
    void editPackages_WhenScheduleConflict_ShouldThrowScheduleException() {
        Packages conflictPackage = Packages.builder()
                .id(2L)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(5))
                .build();

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide))
                .thenReturn(List.of(conflictPackage));

        assertThrows(ScheduleException.class, () ->
                packagesService.editPackages(1L, detailsDto));
    }

    @Test
    void editPackages_WhenCostInvalid_ShouldThrowInputException() {
        detailsDto.setCost(0L);

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());

        assertThrows(InputException.class, () ->
                packagesService.editPackages(1L, detailsDto));
    }

    @Test
    void editPackages_WhenCapacityInvalid_ShouldThrowInputException() {
        detailsDto.setCapacity(0L);

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());

        assertThrows(InputException.class, () ->
                packagesService.editPackages(1L, detailsDto));
    }

    @Test
    void editPackages_WhenCapacityLessThanBooked_ShouldThrowInputException() {
        // Giả sử available = 7, capacity = 10 -> đã có 3 người đặt
        packageEntity.setCapacity(10L);
        packageEntity.setAvailable(7L);
        detailsDto.setCapacity(2L); // nhỏ hơn số đã đặt (3)

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());

        assertThrows(InputException.class, () ->
                packagesService.editPackages(1L, detailsDto));
    }

    @Test
    void editPackages_WhenValid_ShouldUpdateAndReturnDto() {
        packageEntity.setCapacity(10L);
        packageEntity.setAvailable(7L);

        when(packagesRepository.findById(1L)).thenReturn(Optional.of(packageEntity));
        when(tourGuidesRepository.findById(1L)).thenReturn(Optional.of(guide));
        when(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(guide)).thenReturn(Collections.emptyList());
        when(packagesRepository.save(any(Packages.class))).thenReturn(packageEntity);
        when(toDtoService.toPackagesSummaryDto(any(Packages.class)))
                .thenReturn(PackagesSummaryDto.builder().id(1L).name("Tour Đà Lạt Updated").build());

        PackagesSummaryDto result = packagesService.editPackages(1L, detailsDto);

        assertNotNull(result);
        assertEquals("Tour Đà Lạt Updated", result.getName());
    }

    @Test
    void getAllPackages_WhenPackagesExist_ShouldReturnList() {
        List<Packages> packagesList = List.of(packageEntity);

        when(packagesRepository.findAll()).thenReturn(packagesList);
        when(toDtoService.toPackagesBasicDtoList(packagesList))
                .thenReturn(List.of(PackagesBasicDto.builder().id(1L).name("Tour Đà Lạt").build()));

        List<PackagesBasicDto> result = packagesService.getAllPackages();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Tour Đà Lạt", result.get(0).getName());
    }

    @Test
    void getAllPackages_WhenNoPackages_ShouldThrowNoContentException() {
        when(packagesRepository.findAll()).thenReturn(Collections.emptyList());

        NoContentException exception = assertThrows(NoContentException.class, () ->
                packagesService.getAllPackages());

        assertEquals("Không tìm thấy gói tour nào", exception.getMessage());
    }

    @Test
    void getPackagesById_WhenPackageExists_ShouldReturnDetails() {
        when(packagesRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(packageEntity));
        when(toDtoService.toPackagesDetailsDto(packageEntity))
                .thenReturn(PackagesDetailsDto.builder().id(1L).name("Tour Đà Lạt").build());

        PackagesDetailsDto result = packagesService.getPackagesById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Tour Đà Lạt", result.getName());
    }

    @Test
    void getPackagesById_WhenNotFound_ShouldThrowNotFoundException() {
        when(packagesRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () ->
                packagesService.getPackagesById(1L));

        assertEquals("Không tồn tại gói tour id 1", exception.getMessage());
    }
    @Test
    void getPackagesBySlug_WhenFound_ShouldReturnDetailsDto() {
        when(packagesRepository.findBySlugAndDeletedFalse("tour-da-lat")).thenReturn(Optional.of(packageEntity));
        when(toDtoService.toPackagesDetailsDto(packageEntity)).thenReturn(detailsDto);

        PackagesDetailsDto result = packagesService.getPackagesBySlug("tour-da-lat");

        assertNotNull(result);
        assertEquals(detailsDto, result);
    }

    @Test
    void getPackagesBySlug_WhenNotFound_ShouldReturnNull() {
        when(packagesRepository.findBySlugAndDeletedFalse("tour-khong-co")).thenReturn(Optional.empty());

        PackagesDetailsDto result = packagesService.getPackagesBySlug("tour-khong-co");

        assertNull(result);
    }
    @Test
    void deletePackages_ShouldCallSoftDeleteById() {
        packagesService.deletePackages(1L);

        verify(packagesRepository, times(1)).softDeleteById(1L);
    }
    @Test
    void searchPackages_WhenCityIdIsZero_ShouldReturnNull() {
        List<PackagesSummaryDto> result = packagesService.searchPackages(0L, "2025-05-01", 5L, 100L, 1000L);
        assertNull(result);
    }

    @Test
    void searchPackages_WhenStartDateIsZero_ShouldReturnNull() {
        List<PackagesSummaryDto> result = packagesService.searchPackages(1L, "0", 5L, 100L, 1000L);
        assertNull(result);
    }

    @Test
    void searchPackages_WhenValidInput_ShouldReturnListOfDtos() {
        LocalDate startDate = LocalDate.of(2025, 5, 1);
        List<Packages> packagesList = List.of(packageEntity);
        List<PackagesSummaryDto> dtoList = List.of(PackagesSummaryDto.builder().id(1L).name("Tour Đà Lạt").build());

        when(packagesRepository.findByCityIdAndStartDateAndAvailableAndCost(1L, startDate, 5L, 100L, 1000L)).thenReturn(packagesList);
        when(toDtoService.toPackagesSummaryDtoList(packagesList)).thenReturn(dtoList);

        List<PackagesSummaryDto> result = packagesService.searchPackages(1L, "2025-05-01", 5L, 100L, 1000L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Tour Đà Lạt", result.get(0).getName());
    }
    @Test
    void findThreeNearestPackage_WhenEmpty_ShouldReturnNull() {
        when(packagesRepository.findThreeNearestPackage()).thenReturn(Collections.emptyList());

        List<PackagesSummaryDto> result = packagesService.findThreeNearestPackage();

        assertNull(result);
    }

    @Test
    void findThreeNearestPackage_WhenFound_ShouldReturnDtoList() {
        List<Packages> packagesList = List.of(packageEntity);
        List<PackagesSummaryDto> dtoList = List.of(PackagesSummaryDto.builder().id(1L).name("Tour Đà Lạt").build());

        when(packagesRepository.findThreeNearestPackage()).thenReturn(packagesList);
        when(toDtoService.toPackagesSummaryDtoList(packagesList)).thenReturn(dtoList);

        List<PackagesSummaryDto> result = packagesService.findThreeNearestPackage();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Tour Đà Lạt", result.get(0).getName());
    }
    @Test
    void searchPackages_WithKeywordAndPage_ShouldReturnPagedDto() {
        Page<Packages> packagesPage = new PageImpl<>(List.of(packageEntity));
        Page<PackagesBasicDto> expectedDtoPage = new PageImpl<>(List.of(PackagesBasicDto.builder().id(1L).name("Tour A").build()));

        when(packagesRepository.findByNameContainingAndDeletedFalse(eq("Tour"), any(Pageable.class)))
                .thenReturn(packagesPage);
        when(toDtoService.toPackagesBasicDtoPage(packagesPage)).thenReturn(expectedDtoPage);

        Page<PackagesBasicDto> result = packagesService.searchPackages("Tour", 0);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Tour A", result.getContent().get(0).getName());
    }

    @Test
    void searchPackages_WhenEmptyResult_ShouldThrowNoContentException() {
        Page<Packages> emptyPage = new PageImpl<>(Collections.emptyList());

        when(packagesRepository.findByNameContainingAndDeletedFalse(eq("Không có"), any(Pageable.class)))
                .thenReturn(emptyPage);

        NoContentException ex = assertThrows(NoContentException.class, () ->
                packagesService.searchPackages("Không có", 0));

        assertEquals("Không tìm thấy gói tour nào", ex.getMessage());
    }
    @Test
    void testGetPackageStats() {
        when(packagesRepository.countByDeletedFalse()).thenReturn(10L);
        when(packagesRepository.countAvailable()).thenReturn(5L);
        when(packagesRepository.countUpcomingPackages()).thenReturn(3L);
        when(packagesRepository.countFinishedPackages()).thenReturn(2L);

        PackagesStatisticsDto stats = packagesService.getPackageStats();

        assertNotNull(stats);
        assertEquals(10L, stats.getPackagesCount());
        assertEquals(5L, stats.getAvailable());
        assertEquals(3L, stats.getUpcoming());
        assertEquals(2L, stats.getFinished());

        verify(packagesRepository).countByDeletedFalse();
        verify(packagesRepository).countAvailable();
        verify(packagesRepository).countUpcomingPackages();
        verify(packagesRepository).countFinishedPackages();
    }

    @Test
    void testSearchTourguidePackages_Success() {
        Long tourguideId = 1L;
        String keyword = "tour";
        int page = 0;

        TourGuides tourGuides = new TourGuides();
        tourGuides.setId(tourguideId);

        Packages package1 = new Packages();
        package1.setId(100L);

        PackagesBasicDto dto = new PackagesBasicDto();
        dto.setId(100L);

        Page<Packages> packagesPage = new PageImpl<>(List.of(package1));
        Page<PackagesBasicDto> dtoPage = new PageImpl<>(List.of(dto));

        // Mock repository
        when(tourGuidesRepository.findById(tourguideId)).thenReturn(Optional.of(tourGuides));
        when(packagesRepository.findByNameContainingAndDeletedFalseAndTourGuides(eq(keyword), eq(tourGuides), any(Pageable.class)))
                .thenReturn(packagesPage);

        // ❗ Mock phần này để không trả về null
        when(toDtoService.toPackagesBasicDtoPage(packagesPage)).thenReturn(dtoPage);

        // Gọi hàm cần test
        Page<PackagesBasicDto> result = packagesService.searchTourguidePackages(tourguideId, keyword, page);

        // Kiểm tra kết quả
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(100L, result.getContent().get(0).getId());

        // Verify
        verify(tourGuidesRepository).findById(tourguideId);
        verify(packagesRepository).findByNameContainingAndDeletedFalseAndTourGuides(eq(keyword), eq(tourGuides), any(Pageable.class));
        verify(toDtoService).toPackagesBasicDtoPage(packagesPage);
    }


    @Test
    void testSearchTourguidePackages_NotFoundTourguide() {
        when(tourGuidesRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () ->
                packagesService.searchTourguidePackages(1L, "tour", 0));
    }

    @Test
    void testSearchTourguidePackages_NoContent() {
        Long tourguideId = 1L;
        TourGuides tourGuides = new TourGuides();
        when(tourGuidesRepository.findById(tourguideId)).thenReturn(Optional.of(tourGuides));
        when(packagesRepository.findByNameContainingAndDeletedFalseAndTourGuides(eq("tour"), eq(tourGuides), any(Pageable.class)))
                .thenReturn(Page.empty());

        assertThrows(NoContentException.class, () ->
                packagesService.searchTourguidePackages(tourguideId, "tour", 0));
    }


@Test
void testGetBookingList_Success() {
    // Giả lập dữ liệu
    Long packageId = 1L;
    Bookings paidBooking = new Bookings();
    paidBooking.setId(100L);
    paidBooking.setPaymentStatus(PaymentStatus.PAID);

    Bookings unpaidBooking = new Bookings();
    unpaidBooking.setId(101L);
    unpaidBooking.setPaymentStatus(PaymentStatus.UNPAID);

    Packages packages = new Packages();
    packages.setId(packageId);
    packages.setBookingsList(Arrays.asList(paidBooking, unpaidBooking));

    BookingsBasicDto bookingsDto = new BookingsBasicDto();
    bookingsDto.setId(100L);

    // Mock repository và dịch vụ DTO
    when(packagesRepository.findByIdAndDeletedFalse(packageId)).thenReturn(Optional.of(packages));
    when(toDtoService.toBookingsBasicDtoList(anyList())).thenReturn(List.of(bookingsDto));

    // Gọi method và kiểm tra kết quả
    List<BookingsBasicDto> result = packagesService.getBookingList(packageId);

    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals(100L, result.get(0).getId());

    // Kiểm tra mock được gọi đúng
    verify(packagesRepository).findByIdAndDeletedFalse(packageId);
    verify(toDtoService).toBookingsBasicDtoList(anyList());
}

    @Test
    void testGetBookingList_NotFoundPackage() {
        when(packagesRepository.findByIdAndDeletedFalse(anyLong())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> packagesService.getBookingList(1L));
    }

    @Test
    void testGetBookingList_NoBooking() {
        Packages packages = new Packages();
        packages.setBookingsList(new ArrayList<>());

        when(packagesRepository.findByIdAndDeletedFalse(anyLong())).thenReturn(Optional.of(packages));

        assertThrows(NoContentException.class, () -> packagesService.getBookingList(1L));
    }


}
