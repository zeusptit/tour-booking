package com.tourbooking.auth;

import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Admin.AdminDetailsDto;
import com.tourbooking.dto.Customer.CustomerDetailsDto;
import com.tourbooking.dto.TourGuides.TourGuidesDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.model.MembershipClass;
import com.tourbooking.model.User;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.AdminService;
import com.tourbooking.service.CustomerService;
import com.tourbooking.service.TourGuidesService;
import com.tourbooking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private TourGuidesService tourGuidesService;
    public String register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) throw new InputException("Địa chỉ email đã tồn tại");
        if (request.getPassword().length() < 8) throw new InputException("Mật khẩu phải dài hơn 8 kí tự");
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDateTime.now())
                .role(request.getRole())
                .build();
        if (request.getRole().name().equals("ADMIN")) {
            AdminDetailsDto adminDetailsDto = AdminDetailsDto.builder()
                    .ho(request.getHo())
                    .ten(request.getTen())
                    .title(request.getTitle())
                    .build();
            userRepository.save(user);
            User user1 = userService.findUserByEmail(request.getEmail());
            adminService.addAdmin(adminDetailsDto, user1);
        } else if (request.getRole().name().equals("CUSTOMER")) {
            CustomerDetailsDto customerDetailsDto = CustomerDetailsDto.builder()
                    .ho(request.getHo())
                    .ten(request.getTen())
                    .membership(MembershipClass.STANDARD)
                    .build();
            userRepository.save(user);
            User user1 = userService.findUserByEmail(request.getEmail());
            customerService.addCustomers(customerDetailsDto, user1);
        } else if (request.getRole().name().equals("TOURGUIDE")) {
            if (request.getSalary() <= 0) throw new InputException("Lương phải >0");
            TourGuidesDetailsDto tourGuidesDetailsDto = TourGuidesDetailsDto.builder()
                    .ho(request.getHo())
                    .ten(request.getTen())
                    .salary(request.getSalary())
                    .build();
            userRepository.save(user);
            User user1 = userService.findUserByEmail(request.getEmail());
            tourGuidesService.addTourGuides(tourGuidesDetailsDto, user1);
        }
        return jwtService.generateToken(user);
    }

    public Token authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return null;
        }
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        String token = jwtService.generateToken(user);
        if (token != null) {
            return new Token(token, user.getRole().name());
        }
        return null;
    }
}
