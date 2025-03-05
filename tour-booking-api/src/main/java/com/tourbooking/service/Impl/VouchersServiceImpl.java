package com.tourbooking.service.Impl;

import com.tourbooking.dto.Vouchers.VouchersDetailsDto;
import com.tourbooking.dto.Vouchers.VouchersStatisticsDto;
import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NoContentException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.Vouchers;
import com.tourbooking.repository.VouchersRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.VouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class VouchersServiceImpl implements VouchersService {
    @Autowired
    private VouchersRepository vouchersRepository;
    @Autowired
    private ConvertToDtoService toDtoService;
    @Override
    public VouchersSummaryDto addVouchers(VouchersSummaryDto vouchersSummaryDto) {
        String generatedCode = UUID.randomUUID().toString().replace("-", "").substring(0,8);
        if (LocalDate.parse(vouchersSummaryDto.getStartTime()).isAfter(LocalDate.parse(vouchersSummaryDto.getEndTime()))) {
            throw new InputException("Ngày kết thúc phải sau ngày bắt đầu");
        }
        if (vouchersSummaryDto.getAmount() <= 0) {
            throw new InputException("Số lượng phải > 0");
        }
        if (vouchersSummaryDto.getPercent() <= 0 || vouchersSummaryDto.getPercent() > 100) {
            throw new InputException("Phần trăm phải trong khoảng 0-100");
        }
        Vouchers vouchers = Vouchers.builder()
                .code(generatedCode)
                .name(vouchersSummaryDto.getName())
                .startTime(LocalDate.parse(vouchersSummaryDto.getStartTime()))
                .endTime(LocalDate.parse(vouchersSummaryDto.getEndTime()))
                .percent(vouchersSummaryDto.getPercent())
                .amount(vouchersSummaryDto.getAmount())
                .build();
        return toDtoService.toVouchersSummaryDto(vouchersRepository.save(vouchers));
    }

    @Override
    public VouchersSummaryDto editVouchers(Long id, VouchersSummaryDto vouchersSummaryDto) {
        Vouchers vouchers = vouchersRepository.findById(id).orElse(null);
        if (vouchers == null) return addVouchers(vouchersSummaryDto);
        else {
            if (LocalDate.parse(vouchersSummaryDto.getStartTime()).isAfter(LocalDate.parse(vouchersSummaryDto.getEndTime()))) {
                throw new InputException("Ngày kết thúc phải sau ngày bắt đầu");
            }
            if (vouchersSummaryDto.getPercent() <= 0 || vouchersSummaryDto.getPercent() > 100) {
                throw new InputException("Phần trăm phải trong khoảng 0-100");
            }
            if (vouchersSummaryDto.getAmount() <= 0) {
                throw new InputException("Số lượng phải > 0");
            }
            vouchers.setName(vouchersSummaryDto.getName());
            vouchers.setAmount(vouchersSummaryDto.getAmount());
            vouchers.setPercent(vouchersSummaryDto.getPercent());
            vouchers.setStartTime(LocalDate.parse(vouchersSummaryDto.getStartTime()));
            vouchers.setEndTime(LocalDate.parse(vouchersSummaryDto.getEndTime()));
            return toDtoService.toVouchersSummaryDto(vouchersRepository.save(vouchers));
        }
    }

    @Override
    public List<VouchersSummaryDto> getAllVouchers() {
        List<Vouchers> vouchersList = vouchersRepository.findAll();
        if (vouchersList.isEmpty())
            throw new NoContentException("Không tìm thấy mã giảm giá nào");
        return toDtoService.toVouchersSummaryDtoList(vouchersList);
    }

    @Override
    public VouchersSummaryDto getVouchersById(Long id) {
        Vouchers vouchers = vouchersRepository.findById(id).orElse(null);
        if(vouchers == null || vouchers.isDeleted())
            throw new NotFoundException("Không tồn tại mã giảm giá id: " + id);
        return toDtoService.toVouchersSummaryDto(vouchers);
    }
    @Override
    public void deleteVouchers(Long id) {
        vouchersRepository.softDeleteById(id);
    }

    @Override
    public Long getPercent(VouchersDetailsDto vouchersDetailsDto) {
        Vouchers exists = vouchersRepository.findByCodeAndDeletedFalse(vouchersDetailsDto.getCode()).orElse(null);
        if (exists == null) return 0L;
        if (exists.getAmount()>0 && exists.getStartTime().isBefore(LocalDate.now()) && exists.getEndTime().isAfter(LocalDate.now())) {
            return exists.getPercent();
        };
        return 0L;
    }

    @Override
    public Page<VouchersSummaryDto> searchVouchers(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 6, Sort.by(Sort.Direction.ASC, "id"));
        Page<Vouchers> vouchersPage = vouchersRepository.searchByKeyword(keyword, pageable);
        if (vouchersPage.isEmpty())  throw new NoContentException("Không tìm thấy mã giảm giá nào");
        return toDtoService.toVouchersSummaryDtoPage(vouchersPage);
    }

    @Override
    public VouchersStatisticsDto getVoucherStats() {
        return VouchersStatisticsDto.builder()
                .voucherCount(vouchersRepository.countByDeletedFalse())
                .build();
    }

//    private VouchersDetailsDto convertEntityToDto(Vouchers vouchers) {
//        VouchersDetailsDto vouchersDetailsDto = VouchersDetailsDto.builder()
//                .id(vouchers.getId())
//                .name(vouchers.getName())
//                .amount(vouchers.getAmount())
//                .code(vouchers.getCode())
//                .percent(vouchers.getPercent())
//                .endTime(vouchers.getEndTime().toString())
//                .startTime(vouchers.getStartTime().toString())
//                .build();
//        return vouchersDetailsDto;
//    }
}
