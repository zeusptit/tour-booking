package com.tourbooking.service.Impl;

import com.tourbooking.auth.Token;
import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Admin.AdminDetailsDto;
import com.tourbooking.model.Admin;
import com.tourbooking.model.User;
import com.tourbooking.repository.AdminRepository;
import com.tourbooking.service.AdminService;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserService userService;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private ConvertToDtoService toDtoService;

    @Autowired
    private JwtService jwtService;
    @Override
    public Admin addAdmin(AdminDetailsDto adminDetailsDto, User user) {
        Admin admin = new Admin();
        admin.setHo(adminDetailsDto.getHo());
        admin.setTen(adminDetailsDto.getTen());
        admin.setTitle(adminDetailsDto.getTitle());
        admin.setUser(user);
        return adminRepository.save(admin);
    }

    @Override
    public void deleteAdmin(Long adminId) {
    }

    @Override
    public Admin updateAdmin(Long adminId, AdminDetailsDto newAdminDetailsDto) {
        Admin existingAdmin = adminRepository.findById(adminId).orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setHo(newAdminDetailsDto.getHo());
            existingAdmin.setTen(newAdminDetailsDto.getTen());
            existingAdmin.setTitle(newAdminDetailsDto.getTitle());
            return adminRepository.save(existingAdmin);
        }
        return null;
    }

    @Override
    public AdminDetailsDto findAdminByUser(User user) {
        Admin admin = adminRepository.findByUser(user);
        if (admin != null) {
            return toDtoService.toAdminDetailsDto(admin);
        }
        return null;
    }

    @Override
    public AdminDetailsDto getAdminDtoByToken(Token token) {
            String email = jwtService.extractUsername(token.getToken());
            User user = userService.findUserByEmail(email);
            Admin admin = adminRepository.findByUser(user);
            return toDtoService.toAdminDetailsDto(admin);
    }

    @Override
    public AdminDetailsDto editAdminInfo(Token token, AdminDetailsDto newAdminDetailsDto) {
        String email = jwtService.extractUsername(token.getToken());
        User user = userService.findUserByEmail(email);
        Admin admin = adminRepository.findByUser(user);
        admin.setHo(newAdminDetailsDto.getHo());
        admin.setTen(newAdminDetailsDto.getTen());
        return toDtoService.toAdminDetailsDto(adminRepository.save(admin));
    }

//    private AdminDetailsDto convertEntityToDto(Admin admin) {
//        AdminDetailsDto adminDetailsDto = AdminDetailsDto.builder()
//                .id(admin.getId())
//                .ho(admin.getHo())
//                .ten(admin.getTen())
//                .title(admin.getTitle())
//                .email(admin.getUser().getEmail())
//                .build();
//        return adminDetailsDto;
//    }
}
