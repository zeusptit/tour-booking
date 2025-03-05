package com.tourbooking.controller;

import com.tourbooking.dto.Vouchers.VouchersSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.VouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/admin/vouchers")

public class VouchersController {
    @Autowired
    private VouchersService vouchersService;

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getVoucherById(@PathVariable Long id) {
        try {
            VouchersSummaryDto vouchersSummaryDto = vouchersService.getVouchersById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Lấy mã giảm giá thành công", vouchersSummaryDto)
            );
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", ex.getMessage(), null)
            );
        }
    }

    @PostMapping("")
    ResponseEntity<ResponseObject> addVouchers(@RequestBody VouchersSummaryDto newVouchersSummaryDto) {
        try {
            VouchersSummaryDto vouchersSummaryDto = vouchersService.addVouchers(newVouchersSummaryDto);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Thêm mã giảm giá thành công", vouchersSummaryDto)
            );
        } catch (InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> editVouchers(@RequestBody VouchersSummaryDto vouchersSummaryDto, @PathVariable Long id) {
        try {
            VouchersSummaryDto updatedVouchersSummaryDto = vouchersService.editVouchers(id, vouchersSummaryDto);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Cập nhật mã giảm giá thành công", updatedVouchersSummaryDto)
            );
        } catch (InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteVouchers(@PathVariable Long id) {
        vouchersService.deleteVouchers(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Xoá mã giảm giá thành công", null)
        );
    }
}
