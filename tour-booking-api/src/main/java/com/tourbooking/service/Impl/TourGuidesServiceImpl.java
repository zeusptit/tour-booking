package com.tourbooking.service.Impl;

import com.tourbooking.auth.Token;
import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesStatisticsDto;
import com.tourbooking.dto.TourGuides.TourGuidesSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.*;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.TourGuidesService;
import com.tourbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TourGuidesServiceImpl implements TourGuidesService {
    @Autowired
    private TourGuidesRepository tourGuidesRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private PackagesRepository packagesRepository;
    @Autowired
    private ConvertToDtoService toDtoService;
    @Override
    public TourGuides addTourGuides(TourGuidesDetailsDto tourGuidesDetailsDto, User user) {
        TourGuides tourGuides = TourGuides.builder()
                .ho(tourGuidesDetailsDto.getHo())
                .ten(tourGuidesDetailsDto.getTen())
                .salary(tourGuidesDetailsDto.getSalary())
                .user(user)
                .build();
        return tourGuidesRepository.save((tourGuides));
    }

    @Override
    public TourGuidesDetailsDto getTourGuidesDtoByToken(Token token) {
        String email = jwtService.extractUsername(token.getToken());
        User user = userService.findUserByEmail(email);
        TourGuides tourGuides = tourGuidesRepository.findByUser(user);
        return convertEntityToDto(tourGuides);
    }

    @Override
    public TourGuidesDetailsDto editTourGuidesInfo(Token token, TourGuidesDetailsDto newTourGuides) {
        if (newTourGuides.getPhone().length() != 10) throw new InputException("Số điện thoại phải đủ 10 chữ số");
        String email = jwtService.extractUsername(token.getToken());
        User user = userService.findUserByEmail(email);
        TourGuides tourGuides = tourGuidesRepository.findByUser(user);
        tourGuides.setHo(newTourGuides.getHo());
        tourGuides.setTen(newTourGuides.getTen());
        tourGuides.setDob(LocalDate.parse(newTourGuides.getDob()));
        tourGuides.setPhone(newTourGuides.getPhone());
        return convertEntityToDto(tourGuidesRepository.save(tourGuides));
    }

    @Override
    public List<TourGuidesSummaryDto> getAllTourGuides() {
        List<TourGuides> tourGuidesList = tourGuidesRepository.findAll();
        if (tourGuidesList.isEmpty()) {
            throw new NoContentException("Không tìm thấy hướng dẫn viên nào");
        }
        return toDtoService.toTourGuidesSummaryDtoList(tourGuidesList);
    }

    @Override
    public TourGuidesSummaryDto getTourGuideById(Long id) {
        TourGuides tourGuides = tourGuidesRepository.findById(id).orElse(null);
        if (tourGuides == null)
            throw new NotFoundException("Hướng dẫn viên id: " + id + " không tồn tại");
        return toDtoService.toTourGuidesSummaryDto(tourGuides);
    }

    @Override
    public TourGuidesDetailsDto editTourGuideSalary(TourGuidesDetailsDto newTourGuides) {
        TourGuides tourGuides = tourGuidesRepository.findById(newTourGuides.getId()).orElse(null);
        if (tourGuides == null) {
            return null;
        }
        tourGuides.setSalary(newTourGuides.getSalary());
        return convertEntityToDto(tourGuidesRepository.save(tourGuides));
    }

    @Override
    public TourGuidesDetailsDto convertToDtoForPackage(TourGuides tourGuides) {
//        return (tourGuides != null) ? convertEntityToDto(tourGuides) : null;
        if (tourGuides == null) return null;
        TourGuidesDetailsDto tourGuidesDetailsDto = TourGuidesDetailsDto.builder()
                .id(tourGuides.getId())
                .ho(tourGuides.getHo())
                .ten(tourGuides.getTen())
                .phone(tourGuides.getPhone())
                //.salary(tourGuides.getSalary())
                //.email(tourGuides.getUser().getEmail())
                .build();
        if (tourGuides.getDob() != null){
            tourGuidesDetailsDto.setDob(tourGuides.getDob().toString());
        }
        return tourGuidesDetailsDto;
    }

    @Override
    public List<PackagesBasicDto> getPackagesList(Token token) {
        String email = jwtService.extractUsername(token.getToken());
        User user = userService.findUserByEmail(email);
        TourGuides tourGuides = tourGuidesRepository.findByUser(user);
        return toDtoService.toPackagesBasicDtoList(packagesRepository.findPackagesByTourGuidesAndDeletedFalse(tourGuides));
    }

    @Override
    public TourGuidesStatisticsDto getTourGuidesStatistics() {
        return TourGuidesStatisticsDto.builder()
                .tourguideCount(tourGuidesRepository.count())
                .build();
    }

    @Override
    public Page<TourGuidesSummaryDto> searchTourguides(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.ASC, "id"));
        Page<TourGuides> tourGuidesPage = tourGuidesRepository.searchByKeyword(keyword, pageable);
        if (tourGuidesPage.isEmpty())  throw new NoContentException("Không tìm thấy hướng dẫn viên nào");
        return toDtoService.toTourGuidesSummaryDtoPage(tourGuidesPage);
    }

    private PackagesDetailsDto convertPackageToDto(Packages packages) {
        PackagesDetailsDto packagesDetailsDto = PackagesDetailsDto.builder()
                .id(packages.getId())
                .name(packages.getName())
                .capacity(packages.getCapacity())
                .cost(packages.getCost())
                .description(packages.getDescription())
                .startDate(packages.getStartDate().toString())
                .endDate(packages.getEndDate().toString())
                .build();
        return packagesDetailsDto;
    }

    private TourGuidesDetailsDto convertEntityToDto(TourGuides tourGuides) {
        TourGuidesDetailsDto tourGuidesDetailsDto = TourGuidesDetailsDto.builder()
                .id(tourGuides.getId())
                .ho(tourGuides.getHo())
                .ten(tourGuides.getTen())
                .phone(tourGuides.getPhone())
                .salary(tourGuides.getSalary())
                .email(tourGuides.getUser().getEmail())
                .packagesList(toDtoService.convertPackagesListForTG(tourGuides.getPackagesList()))
                .build();
        if (tourGuides.getDob() != null){
            tourGuidesDetailsDto.setDob(tourGuides.getDob().toString());
        }
        return tourGuidesDetailsDto;
    }
}
