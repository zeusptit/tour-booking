package com.tourbooking.service;

import com.tourbooking.auth.Token;
import com.tourbooking.dto.Admin.AdminDetailsDto;
import com.tourbooking.model.Admin;
import com.tourbooking.model.User;

public interface AdminService {
    Admin addAdmin(AdminDetailsDto adminDetailsDto, User user);
    void deleteAdmin(Long adminId);
    Admin updateAdmin(Long adminId, AdminDetailsDto newAdminDetailsDto);
    AdminDetailsDto findAdminByUser(User user);
    AdminDetailsDto getAdminDtoByToken(Token token);
    AdminDetailsDto editAdminInfo(Token token, AdminDetailsDto newAdminDetailsDto);
}
