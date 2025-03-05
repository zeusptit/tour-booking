package com.tourbooking.service;

import com.tourbooking.auth.Token;
import com.tourbooking.dto.Packages.PackagesBasicDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesStatisticsDto;
import com.tourbooking.dto.TourGuides.TourGuidesSummaryDto;
import com.tourbooking.model.TourGuides;
import com.tourbooking.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TourGuidesService {

    TourGuides addTourGuides(TourGuidesDetailsDto tourGuidesDetailsDto, User user);
    TourGuidesDetailsDto getTourGuidesDtoByToken(Token token);
    TourGuidesDetailsDto editTourGuidesInfo(Token token, TourGuidesDetailsDto newTourGuides);
    List<TourGuidesSummaryDto> getAllTourGuides();
    TourGuidesSummaryDto getTourGuideById(Long id);
    TourGuidesDetailsDto editTourGuideSalary(TourGuidesDetailsDto newTourGuides);
    TourGuidesDetailsDto convertToDtoForPackage(TourGuides tourGuides);
    List<PackagesBasicDto> getPackagesList(Token token);
    TourGuidesStatisticsDto getTourGuidesStatistics();
    Page<TourGuidesSummaryDto> searchTourguides(String keyword, int page);
}
