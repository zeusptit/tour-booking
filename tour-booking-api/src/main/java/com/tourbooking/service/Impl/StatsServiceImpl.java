package com.tourbooking.service.Impl;

import com.tourbooking.dto.Stats.StatsDto;
import com.tourbooking.model.PaymentStatus;
import com.tourbooking.repository.BookingsRepository;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsServiceImpl implements StatsService {
    @Autowired
    private PackagesRepository packagesRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private CustomersRepository customersRepository;
    @Autowired
    private TourGuidesRepository tourGuidesRepository;


    @Override
    public StatsDto getStats() {
        return StatsDto.builder()
                .customersNumber(customersRepository.count())
                .tourguidesNumber(tourGuidesRepository.count())
                .packagesNumber(packagesRepository.countByDeletedFalse())
                .bookingsNumber(bookingsRepository.count())
                .paidBookingsNumber(bookingsRepository.countByPaymentStatus(PaymentStatus.PAID))
                .expiredBookingsNumber(bookingsRepository.countByPaymentStatus(PaymentStatus.EXPIRED))
                .pendingBookingsNumber(bookingsRepository.countByPaymentStatus(PaymentStatus.PENDING))
                .finishedPackages(packagesRepository.countFinishedPackages())
                .ongoingPackages(packagesRepository.countOngoingPackages())
                .upcomingPackages(packagesRepository.countUpcomingPackages())
                .build();
    }
}
