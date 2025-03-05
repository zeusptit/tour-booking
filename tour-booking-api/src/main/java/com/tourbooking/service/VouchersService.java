package com.tourbooking.service;


import com.tourbooking.dto.Vouchers.VouchersDetailsDto;
import com.tourbooking.dto.Vouchers.VouchersStatisticsDto;
import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VouchersService {

    VouchersSummaryDto addVouchers(VouchersSummaryDto vouchersSummaryDto);
    VouchersSummaryDto editVouchers(Long id, VouchersSummaryDto vouchersSummaryDto);
    List<VouchersSummaryDto> getAllVouchers();
    VouchersSummaryDto getVouchersById(Long id);
    void deleteVouchers(Long id);
    Long getPercent(VouchersDetailsDto vouchersDetailsDto);

    Page<VouchersSummaryDto> searchVouchers(String keyword, int page);

    VouchersStatisticsDto getVoucherStats();
}
