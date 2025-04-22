package com.tourbooking.setup;

import com.tourbooking.dto.Vouchers.VouchersDetailsDto;
import com.tourbooking.dto.Vouchers.VouchersStatisticsDto;
import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.Vouchers;
import com.tourbooking.repository.VouchersRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.Impl.VouchersServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class VouchersServiceImplTest {

    @Mock
    private VouchersRepository vouchersRepository;

    @Mock
    private ConvertToDtoService toDtoService;

    @InjectMocks
    private VouchersServiceImpl vouchersService;

    private VouchersSummaryDto validDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        validDto = VouchersSummaryDto.builder()
                .name("Voucher Test")
                .amount(10L)
                .percent(20L)
                .startTime("2025-04-01")
                .endTime("2025-04-30")
                .build();
    }

    @Test
    @DisplayName("editVouchers - voucher not found -> call addVouchers")
    void editVouchers_VoucherNotFound_ShouldCallAddVouchers() {
        when(vouchersRepository.findById(1L)).thenReturn(Optional.empty());
        VouchersSummaryDto addedDto = VouchersSummaryDto.builder().name("Added").build();
        when(vouchersService.addVouchers(validDto)).thenReturn(addedDto);

        VouchersServiceImpl service = Mockito.spy(vouchersService);
        doReturn(addedDto).when(service).addVouchers(validDto);

        VouchersSummaryDto result = service.editVouchers(1L, validDto);

        assertEquals("Added", result.getName());
        verify(service).addVouchers(validDto);
    }

    @Test
    @DisplayName("editVouchers - success")
    void editVouchers_Success() {
        Vouchers existing = Vouchers.builder()
                .id(1L)
                .name("Old Name")
                .amount(5L)
                .percent(10L)
                .startTime(LocalDate.of(2025, 1, 1))
                .endTime(LocalDate.of(2025, 2, 1))
                .build();

        when(vouchersRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(vouchersRepository.save(any(Vouchers.class))).thenAnswer(inv -> inv.getArgument(0));
        when(toDtoService.toVouchersSummaryDto(any(Vouchers.class)))
                .thenAnswer(inv -> {
                    Vouchers v = inv.getArgument(0);
                    return VouchersSummaryDto.builder()
                            .name(v.getName())
                            .amount(v.getAmount())
                            .percent(v.getPercent())
                            .startTime(v.getStartTime().toString())
                            .endTime(v.getEndTime().toString())
                            .build();
                });

        VouchersSummaryDto result = vouchersService.editVouchers(1L, validDto);

        assertEquals(validDto.getName(), result.getName());
        assertEquals(validDto.getAmount(), result.getAmount());
        assertEquals(validDto.getPercent(), result.getPercent());
        assertEquals(validDto.getStartTime(), result.getStartTime());
        assertEquals(validDto.getEndTime(), result.getEndTime());
    }

    @Test
    @DisplayName("editVouchers - end date before start date -> InputException")
    void editVouchers_InvalidDates_ShouldThrowInputException() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .name("Invalid Dates")
                .amount(5L)
                .percent(10L)
                .startTime("2025-05-01")
                .endTime("2025-04-01")
                .build();

        Vouchers existing = Vouchers.builder().id(1L).build();
        when(vouchersRepository.findById(1L)).thenReturn(Optional.of(existing));

        InputException ex = assertThrows(InputException.class, () -> vouchersService.editVouchers(1L, dto));
        assertEquals("Ngày kết thúc phải sau ngày bắt đầu", ex.getMessage());
    }

    @Test
    @DisplayName("editVouchers - invalid percent -> InputException")
    void editVouchers_InvalidPercent_ShouldThrowInputException() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .name("Invalid Percent")
                .amount(10L)
                .percent(120L)
                .startTime("2025-04-01")
                .endTime("2025-04-30")
                .build();

        Vouchers existing = Vouchers.builder().id(1L).build();
        when(vouchersRepository.findById(1L)).thenReturn(Optional.of(existing));

        InputException ex = assertThrows(InputException.class, () -> vouchersService.editVouchers(1L, dto));
        assertEquals("Phần trăm phải trong khoảng 0-100", ex.getMessage());
    }

    @Test
    @DisplayName("editVouchers - invalid amount -> InputException")
    void editVouchers_InvalidAmount_ShouldThrowInputException() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .name("Invalid Amount")
                .amount(0L)
                .percent(50L)
                .startTime("2025-04-01")
                .endTime("2025-04-30")
                .build();

        Vouchers existing = Vouchers.builder().id(1L).build();
        when(vouchersRepository.findById(1L)).thenReturn(Optional.of(existing));

        InputException ex = assertThrows(InputException.class, () -> vouchersService.editVouchers(1L, dto));
        assertEquals("Số lượng phải > 0", ex.getMessage());
    }

    @Test
    void addVouchers_Success() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .name("Voucher 1")
                .amount(10L)
                .percent(20L)
                .startTime("2025-04-01")
                .endTime("2025-04-30")
                .build();

        Vouchers saved = Vouchers.builder()
                .name(dto.getName())
                .amount(dto.getAmount())
                .percent(dto.getPercent())
                .startTime(LocalDate.parse(dto.getStartTime()))
                .endTime(LocalDate.parse(dto.getEndTime()))
                .build();

        when(vouchersRepository.save(any())).thenReturn(saved);
        when(toDtoService.toVouchersSummaryDto(any())).thenReturn(dto);

        VouchersSummaryDto result = vouchersService.addVouchers(dto);
        assertEquals(dto.getName(), result.getName());
    }

    @Test
    void addVouchers_InvalidDates_ThrowsException() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .startTime("2025-05-01")
                .endTime("2025-04-01")
                .amount(10L)
                .percent(20L)
                .build();
        assertThrows(InputException.class, () -> vouchersService.addVouchers(dto));
    }

    @Test
    void editVouchers_NewVoucher() {
        VouchersSummaryDto dto = VouchersSummaryDto.builder()
                .name("New")
                .amount(5L)
                .percent(10L)
                .startTime("2025-04-01")
                .endTime("2025-04-30")
                .build();

        when(vouchersRepository.findById(1L)).thenReturn(Optional.empty());
        when(vouchersRepository.save(any())).thenReturn(new Vouchers());
        when(toDtoService.toVouchersSummaryDto(any())).thenReturn(dto);

        VouchersSummaryDto result = vouchersService.editVouchers(1L, dto);
        assertEquals("New", result.getName());
    }

    @Test
    void getAllVouchers_EmptyList_ThrowsException() {
        when(vouchersRepository.findAll()).thenReturn(Collections.emptyList());
        assertThrows(NoContentException.class, () -> vouchersService.getAllVouchers());
    }

    @Test
    void getVouchersById_NotFound_ThrowsException() {
        when(vouchersRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> vouchersService.getVouchersById(1L));
    }

    @Test
    void getPercent_ValidConditions() {
        Vouchers validVoucher = Vouchers.builder()
                .code("ABC123")
                .startTime(LocalDate.now().minusDays(1))
                .endTime(LocalDate.now().plusDays(1))
                .amount(5L)
                .percent(30L)
                .build();

        when(vouchersRepository.findByCodeAndDeletedFalse("ABC123")).thenReturn(Optional.of(validVoucher));

        VouchersDetailsDto dto = VouchersDetailsDto.builder().code("ABC123").build();
        Long percent = vouchersService.getPercent(dto);
        assertEquals(30L, percent);
    }

    @Test
    void searchVouchers_FoundResults() {
        Pageable pageable = PageRequest.of(0, 6, Sort.by(Sort.Direction.ASC, "id"));
        Page<Vouchers> page = new PageImpl<>(List.of(new Vouchers()));
        when(vouchersRepository.searchByKeyword("test", pageable)).thenReturn(page);
        when(toDtoService.toVouchersSummaryDtoPage(page)).thenReturn(Page.empty());
        assertNotNull(vouchersService.searchVouchers("test", 0));
    }

    @Test
    void getVoucherStats_ReturnsCount() {
        when(vouchersRepository.countByDeletedFalse()).thenReturn(5L);
        VouchersStatisticsDto stats = vouchersService.getVoucherStats();
        assertEquals(5L, stats.getVoucherCount());
    }
}
