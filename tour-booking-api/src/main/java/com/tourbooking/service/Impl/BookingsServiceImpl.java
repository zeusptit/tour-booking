package com.tourbooking.service.Impl;

import com.tourbooking.auth.Token;
import com.tourbooking.dto.Booking.BookingStatisticsDto;
import com.tourbooking.dto.Booking.BookingsBasicDto;
import com.tourbooking.dto.Booking.BookingsDetailsDto;
import com.tourbooking.dto.Booking.BookingsSummaryDto;
import com.tourbooking.exception.BookingException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.*;
import com.tourbooking.repository.BookingsRepository;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.VouchersRepository;
import com.tourbooking.service.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Service
public class BookingsServiceImpl implements BookingsService {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private GmailSenderService gmailSenderService;
    @Autowired
    private PackagesRepository packagesRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private VouchersRepository vouchersRepository;
    @Autowired
    private CustomersRepository customersRepository;
    @Autowired
    private ConvertToDtoService toDtoService;
    @Autowired
    private VNPayService vnPayService;
    @Override
    public String addBooking(BookingsDetailsDto bookingsDetailsDto) throws BookingException {
        Customers customers = customersRepository.findById(bookingsDetailsDto.getCustomers().getId()).orElse(null);
        if (customers == null) throw new BookingException("Khách hàng không tồn tại");
        Long member = 0L;
        if (customers.getMembership().equals(MembershipClass.PREMIUM)) member = 100000L;
        Packages packages = packagesRepository.findById(bookingsDetailsDto.getPackages().getId()).orElse(null);
        if (packages == null) throw new BookingException("Tour không tồn tại");
        if (packages.getAvailable() < bookingsDetailsDto.getNumberOfPeople()) throw new BookingException("Tour đã hết chỗ");
        packages.setAvailable(packages.getAvailable()- bookingsDetailsDto.getNumberOfPeople());
        Long subtotal = bookingsDetailsDto.getNumberOfPeople() * packages.getCost();
        Double total = 1.0 * bookingsDetailsDto.getNumberOfPeople() * (packages.getCost() - member);
        Vouchers vouchers = null;
        if (!bookingsDetailsDto.getVouchers().getCode().equals("")) {
            vouchers = vouchersRepository.findByCodeAndDeletedFalse(bookingsDetailsDto.getVouchers().getCode()).orElse(null);
            if (vouchers == null) throw new BookingException("Voucher không tồn tại");
            if (vouchers.getEndTime().isBefore(LocalDate.now())) throw new BookingException("Voucher hết hạn");
            if (vouchers.getAmount() <= 0) throw new BookingException("Voucher hết lượt sử dụng");
            total = total * (100-vouchers.getPercent()) / 100;
            vouchers.setAmount(vouchers.getAmount()-1);
            vouchers = vouchersRepository.save(vouchers);
        }
        Long longTotal = Math.round(total);
        String generatedCode = UUID.randomUUID().toString().replace("-", "").substring(0,8).toUpperCase();
        packages = packagesRepository.save(packages);
        Bookings bookings = Bookings.builder()
                .total(longTotal)
                .subtotal(subtotal)
                .voucher(vouchers != null ? vouchers.getPercent() : 0)
                .member(member * bookingsDetailsDto.getNumberOfPeople())
                .code(generatedCode)
                .note(bookingsDetailsDto.getNote())
                .customers(customers)
                .packages(packages)
                .numberOfPeople(bookingsDetailsDto.getNumberOfPeople())
                .pickup(bookingsDetailsDto.isPickup())
                .createdAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .paymentStatus(PaymentStatus.PENDING)
                .vouchers(vouchers)
                .build();
        Bookings bookings1 = bookingsRepository.save(bookings);
        return vnPayService.createPayment(bookings1);
    }

    @Override
    public BookingsDetailsDto getBookingById(Long id) {
        Bookings bookings = bookingsRepository.findById(id).orElse(null);
        if (bookings == null)
            throw new NotFoundException("Không tồn tại đơn hàng id: " + id);
        return toDtoService.toBookingsDetailsDto(bookings);
    }

    @Override
    public void cancelBooking(Long id) {
        System.out.println("gọi cancel booking");
        Bookings bookings = bookingsRepository.findById(id).orElse(null);
        if (bookings == null) return;
        bookings.setPaymentStatus(PaymentStatus.EXPIRED);
        bookings.setUpdateAt(LocalDateTime.now());
        Vouchers vouchers = bookings.getVouchers();
        if (vouchers != null) {
            vouchers.setAmount(vouchers.getAmount()+1);
            vouchersRepository.save(vouchers);
        }
        Packages packages = bookings.getPackages();
        if (packages != null) {
            packages.setAvailable(bookings.getNumberOfPeople() + packages.getAvailable());
            packagesRepository.save(packages);
        }
        bookingsRepository.save(bookings);
    }

    @Override
    public boolean confirmBooking(Long id) throws BookingException, MessagingException {
        Bookings bookings = bookingsRepository.findById(id).orElse(null);
        if (bookings == null) throw new BookingException("Booking không tồn tại");
        if (bookings.getPaymentStatus().equals(PaymentStatus.EXPIRED))
            throw new BookingException("Booking đã hết thời gian chờ");
        if (bookings.getPaymentStatus().equals(PaymentStatus.PENDING))
        {
            bookings.setPaymentStatus(PaymentStatus.PAID);
            bookings.setUpdateAt(LocalDateTime.now());
            if (bookingsRepository.save(bookings) == null)
                throw new BookingException("Xác nhận booking không thành công");
        }
        gmailSenderService.sendEmailConfirm(id);
        return true;
    }

    @Override
    public PaymentStatus checkBooking(String code) throws BookingException, MessagingException {
        Bookings bookings = bookingsRepository.findByCode(code).orElse(null);
        if (bookings == null) throw new BookingException("Đơn hàng không tồn tại");
        if (bookings.getPaymentStatus().equals(PaymentStatus.PENDING)
                && !bookings.getVnPay().isQueried()){
            int isPaid = vnPayService.queryPayment(bookings.getVnPay());
            if (isPaid == 1) {
                bookings.setPaymentStatus(PaymentStatus.PAID);
                bookings.setUpdateAt(LocalDateTime.now());
                bookingsRepository.save(bookings);
                gmailSenderService.sendEmailConfirm(bookings.getId());
                return PaymentStatus.PAID;
            } else if (isPaid == 0) {
                cancelBooking(bookings.getId());
                return PaymentStatus.EXPIRED;
            }
        }
        return bookings.getPaymentStatus();
    }

    @Override
    public List<BookingsSummaryDto> getAllBookings() {
        List<Bookings> bookingsList = bookingsRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        if (bookingsList.isEmpty())
            throw new NoContentException("Không tìm thấy đặt hàng nào");
        return toDtoService.toBookingsSummaryDtoList(bookingsList);
    }

    @Override
    public Page<BookingsSummaryDto> getAllBookingsPage(int page) {
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.DESC, "id"));
        Page<Bookings> bookingsPage = bookingsRepository.findAll(pageable);
        return toDtoService.toBookingsSummaryDtoList(bookingsPage);
    }

    @Override
    public Map<LocalDate, BookingStatisticsDto> getBookingStatisticsByDayOfMonth(int year, int month) {
        LocalDateTime startDate = LocalDate.of(year, month, 1).atStartOfDay();
        LocalDateTime endDate = LocalDate.of(year, month, 1).plusMonths(1).atStartOfDay().minusNanos(1);
        List<Bookings> bookings = bookingsRepository.findAllByCreatedAtBetween(startDate, endDate);
        Map<LocalDate, BookingStatisticsDto> statisticsMap = new TreeMap<>();
        for (Bookings booking : bookings) {
            if (booking.getPaymentStatus().equals(PaymentStatus.PAID)) {
                LocalDate bookingDate = LocalDate.parse(booking.getCreatedAt().toString().split("T")[0]);
                BookingStatisticsDto statistics = statisticsMap.getOrDefault(bookingDate, new BookingStatisticsDto());
                statistics.setBookingCount(statistics.getBookingCount() + 1);
                statistics.setTotalRevenue(statistics.getTotalRevenue() + booking.getTotal());
                statisticsMap.put(bookingDate, statistics);
            }
        }
        LocalDate currentDate = startDate.toLocalDate();
        while (!currentDate.isAfter(endDate.toLocalDate())) {
            statisticsMap.putIfAbsent(currentDate, new BookingStatisticsDto());
            currentDate = currentDate.plusDays(1);
        }
        return statisticsMap;
    }

    @Override
    public Page<BookingsSummaryDto> searchBookings(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.DESC, "id"));
        Page<Bookings> bookingsPage = bookingsRepository.findByCodeContaining(keyword, pageable);
        if (bookingsPage.isEmpty())  throw new NoContentException("Không tìm thấy đơn hàng nào");
        return toDtoService.toBookingsSummaryDtoList(bookingsPage);
    }

    @Override
    public Page<BookingsBasicDto> searchCustomerBookings(Long customerId, String keyword, int page) {
        Customers customers = customersRepository.findById(customerId).orElse(null);
        if (customers == null) throw new NotFoundException("Không tồn tại khách hàng");
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.DESC, "id"));
        Page<Bookings> bookingsPage = bookingsRepository.findByCodeContainingAndCustomers(keyword, customers, pageable);
        if (bookingsPage.isEmpty())  throw new NoContentException("Không tìm thấy đơn hàng nào");
        return toDtoService.toBookingsBasicDtoList(bookingsPage);
    }

    @Override
    public Page<BookingsBasicDto> searchVoucherBookings(Long voucherId, String keyword, int page) {
        Vouchers vouchers = vouchersRepository.findById(voucherId).orElse(null);
        if (vouchers == null) throw new NotFoundException("Không tồn tại mã giảm giá");
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.DESC, "id"));
        Page<Bookings> bookingsPage = bookingsRepository.findByCodeContainingAndVouchers(keyword, vouchers, pageable);
        if (bookingsPage.isEmpty())  throw new NoContentException("Không tìm thấy đơn hàng nào");
        return toDtoService.toBookingsBasicDtoList(bookingsPage);
    }

    @Override
    public Page<BookingsBasicDto> searchCustomerBookings(String authorizationHeader, String keyword, int page) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            throw new NotFoundException("Không tồn tại khách hàng");
        String accessToken = authorizationHeader.substring(7);
        Customers customers = customerService.getCustomerByToken(
                new Token(accessToken, ""));
        return searchCustomerBookings(customers.getId(), keyword, page);
    }


//    private BookingsDetailsDto convertEntityToDto(Bookings bookings) {
//        BookingsDetailsDto bookingsDetailsDto = BookingsDetailsDto.builder()
//                .id(bookings.getId())
//                .paymentStatus(bookings.getPaymentStatus())
//                .subtotal(bookings.getSubtotal())
//                .voucher(bookings.getVoucher())
//                .member(bookings.getMember())
//                .total(bookings.getTotal())
//                .customers(convertToDtoService.convertForBooking(bookings.getCustomers()))
//                .note(bookings.getNote())
//                .code(bookings.getCode())
//                .createAt(bookings.getCreatedAt().toString().replace("T", " "))
//                .updateAt(bookings.getUpdateAt().toString().replace("T", " "))
//                .numberOfPeople(bookings.getNumberOfPeople())
//                .packages(convertToDtoService.convertForBooking(bookings.getPackages()))
//                .pickup(bookings.isPickup())
//                .build();
//        if (bookings.getVouchers() != null) {
//            bookingsDetailsDto.setVouchers(VouchersDetailsDto.builder()
//                            .id(bookings.getVouchers().getId())
//                            .code(bookings.getVouchers().getCode())
//                            .percent(bookings.getVouchers().getPercent())
//                            .build());
//        }
//        return bookingsDetailsDto;
//    }
}
