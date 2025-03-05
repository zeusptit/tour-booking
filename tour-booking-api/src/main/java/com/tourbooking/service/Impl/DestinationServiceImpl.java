package com.tourbooking.service.Impl;

import com.tourbooking.dto.Destinations.*;
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
import com.tourbooking.service.DestinationService;
import com.tourbooking.service.SlugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationServiceImpl implements DestinationService {
    @Autowired
    private CitiesService citiesService;
    @Autowired
    private CitiesRepository citiesRepository;
    @Autowired
    private DestinationsRepository destinationsRepository;
    @Autowired
    private ConvertToDtoService toDtoService;
    @Override
    public DestinationsDetailsDto addDestinations(DestinationsDetailsDto destinationsDetailsDto) {
        Cities cities = citiesRepository.findById(destinationsDetailsDto.getCityId()).orElse(null);
        if (cities == null) return null;
        String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
        Destinations destinations = Destinations.builder()
                .name(destinationsDetailsDto.getName())
                .price(destinationsDetailsDto.getPrice())
                .description(destinationsDetailsDto.getDescription())
                .rate(destinationsDetailsDto.getRate())
                .address(destinationsDetailsDto.getAddress())
                .cities(cities)
                .slug(slug)
                .image(destinationsDetailsDto.getImage())
                .build();
        return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(destinations));
    }

    @Override
    public DestinationsDetailsDto editDestinations(DestinationsDetailsDto destinationsDetailsDto) {
        Destinations destinations = destinationsRepository.findById(destinationsDetailsDto.getId()).orElse(null);
        Cities cities = citiesRepository.findById(destinationsDetailsDto.getCityId()).orElse(null);
        if (cities == null) return null;
        if (destinations == null) return addDestinations(destinationsDetailsDto);
        else {
            String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
            destinations.setName(destinationsDetailsDto.getName());
            destinations.setDescription(destinationsDetailsDto.getDescription());
            destinations.setPrice(destinationsDetailsDto.getPrice());
            destinations.setRate(destinationsDetailsDto.getRate());
            destinations.setAddress(destinationsDetailsDto.getAddress());
            destinations.setImage(destinationsDetailsDto.getImage());
            destinations.setSlug(slug);
            destinations.setCities(cities);
            return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(destinations));
        }
    }

    @Override
    public List<DestinationsDetailsDto> getAllDestinationsDto() {
        List<Destinations> destinationsList =  destinationsRepository.findAll();
        if (destinationsList.isEmpty()) return null;
        return toDtoService.toDestinationsDetailsDtoList(destinationsList);
    }

    @Override
    public DestinationsDetailsDto getDestinationsById(Long id) {
        Destinations destinations = destinationsRepository.findById(id).orElse(null);
        if (destinations == null) return null;
        return toDtoService.toDestinationsDetailsDto(destinations);
    }

    @Override
    public DestinationsDetailsDto getDestinationsBySlug(String slug) {
        Destinations destinations =
                destinationsRepository.findBySlugAndDeletedFalse(slug).orElse(null);
        if (destinations == null) return null;
        return toDtoService.toDestinationsDetailsDto(destinations);
    }

    @Override
    public DestinationsDetailsDto getHotelById(Long id) {
        Destinations places =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.HOTEL).orElse(null);
        if (places == null)
            throw new NotFoundException("Không tồn tại khách sạn id:" + id);
        return toDtoService.toDestinationsDetailsDto(places);
    }

    @Override
    public DestinationsDetailsDto getRestaurantById(Long id) {
        Destinations places =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.RESTAURANT).orElse(null);
        if (places == null) return null;
        return toDtoService.toDestinationsDetailsDto(places);
    }

    @Override
    public DestinationsDetailsDto getPlacesOfVisitById(Long id) {
        Destinations places =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id, DestinationType.PLACES_OF_VISIT).orElse(null);
        if (places == null)
            throw new NotFoundException("Không tồn tại địa điểm id:" + id);
        return toDtoService.toDestinationsDetailsDto(places);
    }

    @Override
    public List<DestinationsDetailsDto> getAllHotels() {
        List<Destinations> destinationsList = destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.HOTEL);
        if (destinationsList.isEmpty())
            throw new NoContentException("Không tìm thấy khách sạn nào");
        return toDtoService.toDestinationsDetailsDtoList(destinationsList);
    }

    @Override
    public List<DestinationsDetailsDto> getAllRestaurants() {
        List<Destinations> destinationsList = destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.RESTAURANT);
        if (destinationsList.isEmpty())
            throw new NoContentException("Không tìm thấy nhà hàng nào");
        return toDtoService.toDestinationsDetailsDtoList(destinationsList);
    }

    @Override
    public List<DestinationsDetailsDto> getAllPlacesOfVisit() {
        List<Destinations> destinationsList = destinationsRepository.findByDestinationTypeAndDeletedFalse(DestinationType.PLACES_OF_VISIT);
        if (destinationsList.isEmpty())
            throw new NoContentException("Không tìm thấy địa điểm nào");
        return toDtoService.toDestinationsDetailsDtoList(destinationsList);
    }

    @Override
    public Page<DestinationsDetailsDto> getPageDestination(DestinationType type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destinations> destinationsPage = destinationsRepository.findByDestinationTypeAndDeletedFalse(pageable, type);
        return toDtoService.toDestinationsDetailsDtoPage(destinationsPage);
    }

    @Override
    public DestinationsDetailsDto addHotels(DestinationsDetailsDto destinationsDetailsDto) {
        if (destinationsDetailsDto.getRate() <= 0 || destinationsDetailsDto.getRate() > 5)
            throw new InputException("Hạng phải nằm trong 1-5");
        if (destinationsDetailsDto.getPrice() <= 0)
            throw new InputException("Giá phải lớn hơn 0");
        String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
        Destinations destinations = Destinations.builder()
                .name(destinationsDetailsDto.getName())
                .price(destinationsDetailsDto.getPrice())
                .description(destinationsDetailsDto.getDescription())
                .rate(destinationsDetailsDto.getRate())
                .address(destinationsDetailsDto.getAddress())
                .cities(citiesService.findById(destinationsDetailsDto.getCityId()))
                .destinationType(DestinationType.HOTEL)
                .image(destinationsDetailsDto.getImage())
                .slug(slug)
                .build();
        return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(destinations));
    }
    @Override
    public DestinationsDetailsDto addRestaurants(DestinationsDetailsDto destinationsDetailsDto) {
        String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
        Destinations destinations = Destinations.builder()
                .name(destinationsDetailsDto.getName())
                .price(destinationsDetailsDto.getPrice())
                .description(destinationsDetailsDto.getDescription())
                .rate(destinationsDetailsDto.getRate())
                .address(destinationsDetailsDto.getAddress())
                .cities(citiesService.findById(destinationsDetailsDto.getCityId()))
                .destinationType(DestinationType.RESTAURANT)
                .image(destinationsDetailsDto.getImage())
                .slug(slug)
                .build();
        return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(destinations));
    }
    @Override
    public DestinationsDetailsDto addPlacesOfVisit(DestinationsDetailsDto destinationsDetailsDto) {
        if (destinationsDetailsDto.getRate() <= 0 || destinationsDetailsDto.getRate() > 5)
            throw new InputException("Hạng phải nằm trong 1-5");
        if (destinationsDetailsDto.getPrice() < 0)
            throw new InputException("Giá phải lớn hơn hoặc bằng 0");
        String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
        Destinations destinations = Destinations.builder()
                .name(destinationsDetailsDto.getName())
                .price(destinationsDetailsDto.getPrice())
                .description(destinationsDetailsDto.getDescription())
                .rate(destinationsDetailsDto.getRate())
                .address(destinationsDetailsDto.getAddress())
                .cities(citiesService.findById(destinationsDetailsDto.getCityId()))
                .destinationType(DestinationType.PLACES_OF_VISIT)
                .image(destinationsDetailsDto.getImage())
                .slug(slug)
                .build();
        return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(destinations));
    }
    @Override
    public DestinationsDetailsDto editHotels(Long id, DestinationsDetailsDto destinationsDetailsDto) {
        Destinations hotel =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id,
                        DestinationType.HOTEL).orElse(null);
        Cities cities = citiesRepository.findById(destinationsDetailsDto.getCityId()).orElse(null);
        if (cities == null) return null;
        if (hotel == null) return addHotels(destinationsDetailsDto);
        else {
            if (destinationsDetailsDto.getRate() <= 0 || destinationsDetailsDto.getRate() > 5)
                throw new InputException("Hạng phải nằm trong 1-5");
            if (destinationsDetailsDto.getPrice() <= 0)
                throw new InputException("Giá phải lớn hơn 0");
            hotel.setName(destinationsDetailsDto.getName());
            hotel.setDescription(destinationsDetailsDto.getDescription());
            hotel.setPrice(destinationsDetailsDto.getPrice());
            hotel.setRate(destinationsDetailsDto.getRate());
            hotel.setAddress(destinationsDetailsDto.getAddress());
            hotel.setImage(destinationsDetailsDto.getImage());
            hotel.setCities(cities);
            String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
            hotel.setSlug(slug);
            return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(hotel));
        }
    }
    @Override
    public DestinationsDetailsDto editRestaurants(DestinationsDetailsDto destinationsDetailsDto) {
        Destinations hotel =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(destinationsDetailsDto.getId(),
                        DestinationType.RESTAURANT).orElse(null);
        Cities cities = citiesRepository.findById(destinationsDetailsDto.getId()).orElse(null);
        if (cities == null) return null;
        if (hotel == null) return addRestaurants(destinationsDetailsDto);
        else {
            hotel.setName(destinationsDetailsDto.getName());
            hotel.setDescription(destinationsDetailsDto.getDescription());
            hotel.setPrice(destinationsDetailsDto.getPrice());
            hotel.setRate(destinationsDetailsDto.getRate());
            hotel.setAddress(destinationsDetailsDto.getAddress());
            hotel.setImage(destinationsDetailsDto.getImage());
            hotel.setCities(cities);
            String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
            hotel.setSlug(slug);
            return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(hotel));
        }
    }
    @Override
    public DestinationsDetailsDto editPlacesOfVisit(Long id, DestinationsDetailsDto destinationsDetailsDto) {
        Destinations hotel =
                destinationsRepository.findByIdAndDestinationTypeAndDeletedFalse(id,
                        DestinationType.PLACES_OF_VISIT).orElse(null);
        Cities cities = citiesRepository.findById(destinationsDetailsDto.getCityId()).orElse(null);
        if (cities == null)  throw new NotFoundException("Không tồn tại tỉnh, thành phố");
        if (hotel == null) return addPlacesOfVisit(destinationsDetailsDto);
        else {
            if (destinationsDetailsDto.getRate() <= 0 || destinationsDetailsDto.getRate() > 5)
                throw new InputException("Hạng phải nằm trong 1-5");
            if (destinationsDetailsDto.getPrice() < 0)
                throw new InputException("Giá phải lớn hơn hoặc bằng 0");
            hotel.setName(destinationsDetailsDto.getName());
            hotel.setDescription(destinationsDetailsDto.getDescription());
            hotel.setPrice(destinationsDetailsDto.getPrice());
            hotel.setRate(destinationsDetailsDto.getRate());
            hotel.setAddress(destinationsDetailsDto.getAddress());
            hotel.setImage(destinationsDetailsDto.getImage());
            hotel.setCities(cities);
            String slug = SlugService.generateSlug(destinationsDetailsDto.getName());
            hotel.setSlug(slug);
            return toDtoService.toDestinationsDetailsDto(destinationsRepository.save(hotel));
        }
    }

    @Override
    public DestinationsDetailsDto convertToDto(Destinations destinations) {
        if (destinations == null) return null;
        return toDtoService.toDestinationsDetailsDto(destinations);
    }

    @Override
    public Page<DestinationBasicDto> searchDestinations(String keyword, int page, DestinationType destinationType) {
        Pageable pageable = PageRequest.of(page, 6, Sort.by(Sort.Direction.ASC, "id"));
        Page<Destinations> destinationsPage =
                destinationsRepository.findByNameContainingAndDestinationTypeAndDeletedFalse(keyword, destinationType, pageable);
        if (destinationsPage.isEmpty()){
            if (destinationType.equals(DestinationType.HOTEL))
                throw new NoContentException("Không tìm thấy khách sạn nào");
            if (destinationType.equals(DestinationType.PLACES_OF_VISIT))
                throw new NoContentException("Không tìm thấy điểm đến nào");
        }
        return toDtoService.toDestinationBasicDtoPage(destinationsPage);
    }

    @Override
    public DestinationStatisticsDto getHotelStats() {
        DestinationType type = DestinationType.HOTEL;
        return DestinationStatisticsDto.builder()
                .count(destinationsRepository.countByDestinationTypeAndDeletedFalse(type))
                .fivestar(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(5.0, type))
                .fourstar(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(4.0, type))
                .free(destinationsRepository.countByPriceAndDestinationTypeAndDeletedFalse(0L, type))
                .build();
    }

    @Override
    public DestinationStatisticsDto getPlaceStats() {
        DestinationType type = DestinationType.PLACES_OF_VISIT;
        return DestinationStatisticsDto.builder()
                .count(destinationsRepository.countByDestinationTypeAndDeletedFalse(type))
                .fivestar(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(5.0, type))
                .fourstar(destinationsRepository.countByRateAndDestinationTypeAndDeletedFalse(4.0, type))
                .free(destinationsRepository.countByPriceAndDestinationTypeAndDeletedFalse(0L, type))
                .build();
    }

    @Override
    public void deletePlaces(Long id) {
        destinationsRepository.softDeleteById(id);
    }

    @Override
    public void deleteHotels(Long id) {
        destinationsRepository.softDeleteById(id);
    }

    @Override
    public List<DestinationSimpleDto> getDesList() {
        return toDtoService.toDestinationsSimpleDto(destinationsRepository.findByDeletedFalse());
    }

//    private DestinationsDetailsDto convertEntityToDto(Destinations destinations) {
//        DestinationsDetailsDto destinationsDetailsDto = DestinationsDetailsDto.builder()
//                .id(destinations.getId())
//                .name(destinations.getName())
//                .price(destinations.getPrice())
//                .description(destinations.getDescription())
//                .rate(destinations.getRate())
//                .address(destinations.getAddress())
//                .image(destinations.getImage())
//                .slug(destinations.getSlug())
//                .destinationType(destinations.getDestinationType())
//                .cityId(destinations.getCities().getId())
//                .cityName(destinations.getCities().getName())
//                .build();
//        return destinationsDetailsDto;
//    }
}
