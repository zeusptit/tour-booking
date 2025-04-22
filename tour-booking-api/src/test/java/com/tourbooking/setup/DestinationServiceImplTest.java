package com.tourbooking.setup;

import com.tourbooking.dto.Destinations.DestinationSimpleDto;
import com.tourbooking.dto.Destinations.DestinationStatisticsDto;
import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.Cities;
import com.tourbooking.model.DestinationType;
import com.tourbooking.model.Destinations;
import com.tourbooking.repository.CitiesRepository;
import com.tourbooking.repository.DestinationsRepository;
import com.tourbooking.service.CitiesService;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.Impl.DestinationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DestinationServiceImplTest {

    @InjectMocks
    private DestinationServiceImpl destinationService;

    @Mock
    private CitiesService citiesService;
    @Mock
    private CitiesRepository citiesRepository;
    @Mock
    private DestinationsRepository destinationsRepository;
    @Mock
    private ConvertToDtoService toDtoService;

    private DestinationsDetailsDto detailsDto;
    private Destinations destinations;
    private Cities city;

    @BeforeEach
    void setup() {
        detailsDto = DestinationsDetailsDto.builder()
                .id(1L)
                .name("Hotel Paradise")
                .price(100L)
                .rate(4.5)
                .description("Nice hotel")
                .address("123 Main St")
                .image(List.of("img1.jpg", "img2.jpg"))
                .cityId(10L)
                .build();

        city = Cities.builder().id(10L).name("Hanoi").build();

        destinations = Destinations.builder()
                .id(1L)
                .name("Hotel Paradise")
                .price(100L)
                .rate(4.5)
                .description("Nice hotel")
                .address("123 Main St")
                .image(List.of("img1.jpg", "img2.jpg"))
                .slug("hotel-paradise")
                .cities(city)
                .destinationType(DestinationType.HOTEL)
                .build();
    }

    @Test
    void testAddDestinations_Success() {
        // Arrange
        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        // Act
        DestinationsDetailsDto result = destinationService.addDestinations(detailsDto);

        // Assert
        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        assertEquals(100L, result.getPrice());
        assertEquals(4.5, result.getRate());
        assertEquals("123 Main St", result.getAddress());
        assertEquals(List.of("img1.jpg", "img2.jpg"), result.getImage());

        verify(citiesRepository).findById(10L);
        verify(destinationsRepository).save(any(Destinations.class));
        verify(toDtoService).toDestinationsDetailsDto(any(Destinations.class));
    }

    @Test
    void testAddDestinations_CityNotFound() {
        // Arrange
        when(citiesRepository.findById(10L)).thenReturn(Optional.empty());

        // Act
        DestinationsDetailsDto result = destinationService.addDestinations(detailsDto);

        // Assert
        assertNull(result);

        verify(citiesRepository).findById(10L);
        verify(destinationsRepository, never()).save(any());
        verify(toDtoService, never()).toDestinationsDetailsDto(any());
    }

    @Test
    void testAddHotel_Success() {
        when(citiesService.findById(detailsDto.getCityId())).thenReturn(city);
        when(destinationsRepository.save(any())).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any())).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.addHotels(detailsDto);

        assertNotNull(result);
        assertEquals(detailsDto.getName(), result.getName());
    }

    @Test
    void testAddHotel_InvalidRate() {
        detailsDto.setRate(6.0); // invalid

        InputException ex = assertThrows(InputException.class, () ->
                destinationService.addHotels(detailsDto));

        assertEquals("Hạng phải nằm trong 1-5", ex.getMessage());
    }

    @Test
    void testEditHotel_NotFound_AddInstead() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.HOTEL))
                .thenReturn(Optional.empty());

        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any())).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any())).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.editHotels(1L, detailsDto);

        assertNotNull(result);
        assertEquals(detailsDto.getName(), result.getName());
    }

    @Test
    void testGetDestinationsById_Found() {
        when(destinationsRepository.findById(1L)).thenReturn(Optional.of(destinations));
        when(toDtoService.toDestinationsDetailsDto(any())).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.getDestinationsById(1L);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
    }

    @Test
    void testGetAllHotels_Empty_ThrowsException() {
        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.HOTEL))
                .thenReturn(List.of());

        assertThrows(NoContentException.class, () ->
                destinationService.getAllHotels());
    }

    @Test
    void testDeleteHotels_SoftDeleteCalled() {
        destinationService.deleteHotels(5L);

        verify(destinationsRepository, times(1)).softDeleteById(5L);
    }

    @Test
    void testGetHotelById_NotFound_ThrowsException() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(999L, DestinationType.HOTEL))
                .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () ->
                destinationService.getHotelById(999L));
    }

    @Test
    void testSearchDestinations_NoResult_ThrowsException() {
        when(destinationsRepository.findByNameContainingAndDestinationTypeAndDeletedFalse(
                anyString(), eq(DestinationType.HOTEL), any(Pageable.class)))
                .thenReturn(Page.empty());

        assertThrows(NoContentException.class, () ->
                destinationService.searchDestinations("Hotel", 0, DestinationType.HOTEL));
    }

    @Test
    void testGetHotelStats_Success() {
        when(destinationsRepository.countByDestinationTypeAndDeletedFalse(DestinationType.HOTEL)).thenReturn(10L);
        when(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(5.0, DestinationType.HOTEL)).thenReturn(3L);
        when(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(4.0, DestinationType.HOTEL)).thenReturn(5L);
        when(destinationsRepository.countByPriceAndDestinationTypeAndDeletedFalse(0L, DestinationType.HOTEL)).thenReturn(2L);

        DestinationStatisticsDto stats = destinationService.getHotelStats();

        assertEquals(10L, stats.getCount());
        assertEquals(3L, stats.getFivestar());
        assertEquals(5L, stats.getFourstar());
        assertEquals(2L, stats.getFree());
    }

    @Test
    void testEditDestinations_UpdateExistingDestination() {
        // Arrange
        when(destinationsRepository.findById(1L)).thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        // Act
        DestinationsDetailsDto result = destinationService.editDestinations(detailsDto);

        // Assert
        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).findById(1L);
        verify(citiesRepository).findById(10L);
        verify(destinationsRepository).save(any(Destinations.class));
        verify(toDtoService).toDestinationsDetailsDto(any(Destinations.class));
    }

    @Test
    void testEditDestinations_CityNotFound() {
        // Arrange
        when(destinationsRepository.findById(1L)).thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.empty());

        // Act
        DestinationsDetailsDto result = destinationService.editDestinations(detailsDto);

        // Assert
        assertNull(result);
        verify(citiesRepository).findById(10L);
        verify(destinationsRepository, never()).save(any());
        verify(toDtoService, never()).toDestinationsDetailsDto(any());
    }

    @Test
    void testEditDestinations_DestinationNotFound_AddNew() {
        // Arrange
        when(destinationsRepository.findById(1L)).thenReturn(Optional.empty());
        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        // Act
        DestinationsDetailsDto result = destinationService.editDestinations(detailsDto);

        // Assert
        assertNotNull(result);
        verify(destinationsRepository).findById(1L);
        verify(destinationsRepository).save(any(Destinations.class));
        verify(toDtoService).toDestinationsDetailsDto(any(Destinations.class));
    }

    @Test
    void testGetDestinationsBySlug_Found() {
        // Arrange
        when(destinationsRepository.findBySlugAndDeletedFalse("hotel-paradise"))
                .thenReturn(Optional.of(destinations));
        when(toDtoService.toDestinationsDetailsDto(destinations))
                .thenReturn(detailsDto);

        // Act
        DestinationsDetailsDto result = destinationService.getDestinationsBySlug("hotel-paradise");

        // Assert
        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).findBySlugAndDeletedFalse("hotel-paradise");
        verify(toDtoService).toDestinationsDetailsDto(destinations);
    }

    @Test
    void testGetDestinationsBySlug_NotFound() {
        // Arrange
        when(destinationsRepository.findBySlugAndDeletedFalse("non-existent"))
                .thenReturn(Optional.empty());

        // Act
        DestinationsDetailsDto result = destinationService.getDestinationsBySlug("non-existent");

        // Assert
        assertNull(result);
        verify(destinationsRepository).findBySlugAndDeletedFalse("non-existent");
        verify(toDtoService, never()).toDestinationsDetailsDto(any());
    }

    @Test
    void testGetRestaurantById_Found() {
        // Arrange
        destinations.setDestinationType(DestinationType.RESTAURANT);
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.RESTAURANT))
                .thenReturn(Optional.of(destinations));
        when(toDtoService.toDestinationsDetailsDto(destinations))
                .thenReturn(detailsDto);

        // Act
        DestinationsDetailsDto result = destinationService.getRestaurantById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.RESTAURANT);
        verify(toDtoService).toDestinationsDetailsDto(destinations);
    }

    @Test
    void testGetRestaurantById_NotFound() {
        // Arrange
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(99L, DestinationType.RESTAURANT))
                .thenReturn(Optional.empty());

        // Act
        DestinationsDetailsDto result = destinationService.getRestaurantById(99L);

        // Assert
        assertNull(result);
        verify(toDtoService, never()).toDestinationsDetailsDto(any());
    }

    @Test
    void testGetAllRestaurants_Success() {
        List<Destinations> list = List.of(destinations);
        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.RESTAURANT))
                .thenReturn(list);
        when(toDtoService.toDestinationsDetailsDtoList(list))
                .thenReturn(List.of(detailsDto));

        List<DestinationsDetailsDto> result = destinationService.getAllRestaurants();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(destinationsRepository).findByDestinationTypeAndDeletedFalse(DestinationType.RESTAURANT);
        verify(toDtoService).toDestinationsDetailsDtoList(list);
    }

    @Test
    void testGetAllRestaurants_NoContent() {
        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.RESTAURANT))
                .thenReturn(Collections.emptyList());

        NoContentException exception = assertThrows(NoContentException.class, () -> {
            destinationService.getAllRestaurants();
        });

        assertEquals("Không tìm thấy nhà hàng nào", exception.getMessage());
        verify(toDtoService, never()).toDestinationsDetailsDtoList(any());
    }

    @Test
    void testAddRestaurants_Success() {
        when(citiesService.findById(10L)).thenReturn(city);
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.addRestaurants(detailsDto);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(citiesService).findById(10L);
        verify(destinationsRepository).save(any(Destinations.class));
        verify(toDtoService).toDestinationsDetailsDto(any(Destinations.class));
    }

    @Test
    void testAddPlacesOfVisit_Success() {
        detailsDto.setRate(4.5);
        detailsDto.setPrice(150L);

        when(citiesService.findById(10L)).thenReturn(city);
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.addPlacesOfVisit(detailsDto);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(citiesService).findById(10L);
        verify(destinationsRepository).save(any(Destinations.class));
        verify(toDtoService).toDestinationsDetailsDto(any(Destinations.class));
    }

    @Test
    void testEditHotels_Success() {
        detailsDto.setRate(4.0);
        detailsDto.setPrice(200L);

        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.HOTEL))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.editHotels(1L, detailsDto);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.HOTEL);
        verify(citiesRepository).findById(10L);
        verify(destinationsRepository).save(any(Destinations.class));
    }

    @Test
    void testEditHotels_CityNotFound() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.HOTEL))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.empty());

        DestinationsDetailsDto result = destinationService.editHotels(1L, detailsDto);

        assertNull(result);
        verify(destinationsRepository, never()).save(any());
    }

    @Test
    void testEditRestaurants_Success() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.RESTAURANT))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(1L)).thenReturn(Optional.of(city)); // lưu ý getId() được truyền vào
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.editRestaurants(detailsDto);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).save(any(Destinations.class));
    }

    @Test
    void testEditRestaurants_CityNotFound() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.RESTAURANT))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(1L)).thenReturn(Optional.empty());

        DestinationsDetailsDto result = destinationService.editRestaurants(detailsDto);

        assertNull(result);
        verify(destinationsRepository, never()).save(any());
    }

    @Test
    void testEditPlacesOfVisit_Success() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.PLACES_OF_VISIT))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.of(city));
        when(destinationsRepository.save(any(Destinations.class))).thenReturn(destinations);
        when(toDtoService.toDestinationsDetailsDto(any(Destinations.class))).thenReturn(detailsDto);

        DestinationsDetailsDto result = destinationService.editPlacesOfVisit(1L, detailsDto);

        assertNotNull(result);
        assertEquals("Hotel Paradise", result.getName());
        verify(destinationsRepository).save(any(Destinations.class));
    }

    @Test
    void testEditPlacesOfVisit_CityNotFound_ShouldThrowException() {
        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(1L, DestinationType.PLACES_OF_VISIT))
                .thenReturn(Optional.of(destinations));
        when(citiesRepository.findById(10L)).thenReturn(Optional.empty());

        NotFoundException ex = assertThrows(NotFoundException.class,
                () -> destinationService.editPlacesOfVisit(1L, detailsDto));

        assertEquals("Không tồn tại tỉnh, thành phố", ex.getMessage());
    }

    @Test
    void testGetPlaceStats_ReturnsCorrectStatistics() {
        DestinationType type = DestinationType.PLACES_OF_VISIT;

        when(destinationsRepository.countByDestinationTypeAndDeletedFalse(type)).thenReturn(100L);
        when(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(5.0, type)).thenReturn(30L);
        when(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(4.0, type)).thenReturn(40L);
        when(destinationsRepository.countByPriceAndDestinationTypeAndDeletedFalse(0L, type)).thenReturn(10L);

        DestinationStatisticsDto stats = destinationService.getPlaceStats();

        assertNotNull(stats);
        assertEquals(100L, stats.getCount());
        assertEquals(30L, stats.getFivestar());
        assertEquals(40L, stats.getFourstar());
        assertEquals(10L, stats.getFree());

        verify(destinationsRepository).countByDestinationTypeAndDeletedFalse(type);
        verify(destinationsRepository).countByRateAndDestinationTypeAndDeletedFalse(5.0, type);
        verify(destinationsRepository).countByRateAndDestinationTypeAndDeletedFalse(4.0, type);
        verify(destinationsRepository).countByPriceAndDestinationTypeAndDeletedFalse(0L, type);
    }

    @Test
    void testDeletePlaces_CallsRepository() {
        Long id = 1L;

        // Act
        destinationService.deletePlaces(id);

        // Assert
        verify(destinationsRepository, times(1)).softDeleteById(id);
    }

    @Test
    void testGetDesList_ReturnsSimpleDtoList() {
        Destinations dest1 = Destinations.builder().id(1L).name("Place A").deleted(false).build();
        Destinations dest2 = Destinations.builder().id(2L).name("Place B").deleted(false).build();

        List<Destinations> mockDestinations = List.of(dest1, dest2);
        List<DestinationSimpleDto> expectedDtos = List.of(
                new DestinationSimpleDto(1L, "Place A"),
                new DestinationSimpleDto(2L, "Place B")
        );

        when(destinationsRepository.findByDeletedFalse()).thenReturn(mockDestinations);
        when(toDtoService.toDestinationsSimpleDto(mockDestinations)).thenReturn(expectedDtos);

        List<DestinationSimpleDto> result = destinationService.getDesList();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedDtos, result);

        verify(destinationsRepository, times(1)).findByDeletedFalse();
        verify(toDtoService, times(1)).toDestinationsSimpleDto(mockDestinations);
    }

    @Test
    void testGetAllPlacesOfVisit_ReturnsList() {
        List<Destinations> mockDestinations = List.of(destinations);
        List<DestinationsDetailsDto> expectedDtoList = List.of(detailsDto);

        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.PLACES_OF_VISIT))
                .thenReturn(mockDestinations);
        when(toDtoService.toDestinationsDetailsDtoList(mockDestinations))
                .thenReturn(expectedDtoList);

        List<DestinationsDetailsDto> result = destinationService.getAllPlacesOfVisit();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(expectedDtoList, result);

        verify(destinationsRepository).findByDestinationTypeAndDeletedFalse(DestinationType.PLACES_OF_VISIT);
        verify(toDtoService).toDestinationsDetailsDtoList(mockDestinations);
    }

    @Test
    void testGetAllPlacesOfVisit_ThrowsNoContentException_WhenEmpty() {
        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.PLACES_OF_VISIT))
                .thenReturn(Collections.emptyList());

        assertThrows(NoContentException.class, () -> destinationService.getAllPlacesOfVisit());

        verify(destinationsRepository).findByDestinationTypeAndDeletedFalse(DestinationType.PLACES_OF_VISIT);
        verify(toDtoService, never()).toDestinationsDetailsDtoList(any());
    }

    @Test
    void testGetPageDestination_ReturnsPagedDto() {
        DestinationType type = DestinationType.PLACES_OF_VISIT;
        int page = 0;
        int size = 5;

        PageRequest pageable = PageRequest.of(page, size);
        Page<Destinations> mockPage = new PageImpl<>(List.of(destinations));
        Page<DestinationsDetailsDto> expectedDtoPage = new PageImpl<>(List.of(detailsDto));

        when(destinationsRepository.findByDestinationTypeAndDeletedFalse(pageable, type))
                .thenReturn(mockPage);
        when(toDtoService.toDestinationsDetailsDtoPage(mockPage))
                .thenReturn(expectedDtoPage);

        Page<DestinationsDetailsDto> result = destinationService.getPageDestination(type, page, size);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(expectedDtoPage, result);

        verify(destinationsRepository).findByDestinationTypeAndDeletedFalse(pageable, type);
        verify(toDtoService).toDestinationsDetailsDtoPage(mockPage);
    }

    @Test
    void testGetPlacesOfVisitById_ReturnsDto() {
        Long id = 1L;
        Destinations mockDestination = destinations;
        DestinationsDetailsDto expectedDto = detailsDto;

        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.PLACES_OF_VISIT))
                .thenReturn(Optional.of(mockDestination));
        when(toDtoService.toDestinationsDetailsDto(mockDestination))
                .thenReturn(expectedDto);

        DestinationsDetailsDto result = destinationService.getPlacesOfVisitById(id);

        assertNotNull(result);
        assertEquals(expectedDto, result);
        verify(destinationsRepository).findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.PLACES_OF_VISIT);
        verify(toDtoService).toDestinationsDetailsDto(mockDestination);
    }

    @Test
    void testGetPlacesOfVisitById_ThrowsNotFoundException_WhenNotFound() {
        Long id = 999L;

        when(destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.PLACES_OF_VISIT))
                .thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () ->
                destinationService.getPlacesOfVisitById(id)
        );

        assertEquals("Không tồn tại địa điểm id:" + id, exception.getMessage());
        verify(destinationsRepository).findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.PLACES_OF_VISIT);
        verify(toDtoService, never()).toDestinationsDetailsDto(any());
    }

}
