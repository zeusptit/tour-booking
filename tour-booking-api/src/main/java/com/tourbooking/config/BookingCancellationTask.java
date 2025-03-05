package com.tourbooking.config;

import com.tourbooking.model.Bookings;
import com.tourbooking.model.PaymentStatus;
import com.tourbooking.repository.BookingsRepository;
import com.tourbooking.service.BookingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class BookingCancellationTask {
    private Logger LOGGER = LoggerFactory.getLogger(BookingCancellationTask.class);
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private BookingsService bookingsService;

    @Scheduled(fixedRate = 30000) // 10 phút
    public void cancelUnpaidOrders() {
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        LOGGER.info("Kiểm tra thanh toán");
        List<Bookings> unpaidBooking = bookingsRepository.findByPaymentStatusAndCreatedAtBefore(PaymentStatus.PENDING, tenMinutesAgo);
        unpaidBooking.forEach(bookings -> {
            bookingsService.cancelBooking(bookings.getId());
            LOGGER.info("Huỷ đơn hàng ID {} do hết hạn thanh toán.", bookings.getId());
        });
    }
}
