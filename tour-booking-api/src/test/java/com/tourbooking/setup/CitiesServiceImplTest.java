package com.tourbooking.setup;

import com.tourbooking.dto.Cities.CitiesDetailsDto;
import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.model.Cities;
import com.tourbooking.repository.CitiesRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.Impl.CitiesServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CitiesServiceImplTest {

    @InjectMocks
    private CitiesServiceImpl citiesService;

    @Mock
    private CitiesRepository citiesRepository;

    @Mock
    private ConvertToDtoService toDtoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddCities() {
        CitiesSummaryDto dto = new CitiesSummaryDto();
        dto.setName("Hanoi");

        Cities savedEntity = Cities.builder().id(1L).name("Hanoi").build();
        CitiesSummaryDto expectedDto = new CitiesSummaryDto();
        expectedDto.setId(1L);
        expectedDto.setName("Hanoi");

        when(citiesRepository.save(any(Cities.class))).thenReturn(savedEntity);
        when(toDtoService.toCitiesSummaryDto(savedEntity)).thenReturn(expectedDto);

        CitiesSummaryDto result = citiesService.addCities(dto);

        assertNotNull(result);
        assertEquals("Hanoi", result.getName());
        verify(citiesRepository).save(any(Cities.class));
        verify(toDtoService).toCitiesSummaryDto(savedEntity);
    }

    @Test
    void testGetAllCities() {
        List<Cities> citiesList = List.of(
                Cities.builder().id(1L).name("Hanoi").build(),
                Cities.builder().id(2L).name("Saigon").build()
        );

        List<CitiesSummaryDto> dtoList = List.of(
                new CitiesSummaryDto(1L, "Hanoi"),
                new CitiesSummaryDto(2L, "Saigon")
        );

        when(citiesRepository.findAll()).thenReturn(citiesList);
        when(toDtoService.toCitiesSummaryListDto(citiesList)).thenReturn(dtoList);

        List<CitiesSummaryDto> result = citiesService.getAllCities();

        assertEquals(2, result.size());
        verify(citiesRepository).findAll();
        verify(toDtoService).toCitiesSummaryListDto(citiesList);
    }

    @Test
    void testFindByName() {
        String name = "Danang";
        Cities city = Cities.builder().id(3L).name(name).build();

        when(citiesRepository.findByName(name)).thenReturn(city);

        Cities result = citiesService.findByName(name);

        assertNotNull(result);
        assertEquals("Danang", result.getName());
        verify(citiesRepository).findByName(name);
    }

    @Test
    void testFindById_WhenExists() {
        Long id = 1L;
        Cities city = Cities.builder().id(id).name("Hue").build();

        when(citiesRepository.findById(id)).thenReturn(Optional.of(city));

        Cities result = citiesService.findById(id);

        assertNotNull(result);
        assertEquals("Hue", result.getName());
        verify(citiesRepository).findById(id);
    }

    @Test
    void testFindById_WhenNotExists() {
        Long id = 99L;

        when(citiesRepository.findById(id)).thenReturn(Optional.empty());

        Cities result = citiesService.findById(id);

        assertNull(result);
        verify(citiesRepository).findById(id);
    }

    @Test
    void testGetCityById_WhenExists() {
        Long id = 1L;
        Cities city = Cities.builder().id(id).name("Nha Trang").build();
        CitiesDetailsDto dto = new CitiesDetailsDto();
        dto.setId(id);
        dto.setName("Nha Trang");

        when(citiesRepository.findById(id)).thenReturn(Optional.of(city));
        when(toDtoService.toCitiesDetailsDto(city)).thenReturn(dto);

        CitiesDetailsDto result = citiesService.getCityById(id);

        assertNotNull(result);
        assertEquals("Nha Trang", result.getName());
        verify(citiesRepository).findById(id);
        verify(toDtoService).toCitiesDetailsDto(city);
    }

    @Test
    void testGetCityById_WhenNotExists() {
        Long id = 404L;

        when(citiesRepository.findById(id)).thenReturn(Optional.empty());

        CitiesDetailsDto result = citiesService.getCityById(id);

        assertNull(result);
        verify(citiesRepository).findById(id);
        verify(toDtoService, never()).toCitiesDetailsDto(any());
    }
}
