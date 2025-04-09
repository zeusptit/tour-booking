package com.tourbooking.setup;

import com.tourbooking.dto.Customer.CustomerDetailsDto;
import com.tourbooking.model.Customers;
import com.tourbooking.model.MembershipClass;
import com.tourbooking.model.Role;
import com.tourbooking.model.User;
import com.tourbooking.repository.AdminRepository;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.CustomerService;
import com.tourbooking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class TestDataService {

    private final CustomersRepository customersRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final CustomerService customerService;
    private final AdminRepository adminRepository;
    private final TourGuidesRepository tourGuidesRepository;

    private User user;
    private Customers customers;

    public void setUp() {
        user = setUpUser();
        customers = setUpCustomers(user);
    }

    public void clearDbBeforeTest() {
        adminRepository.deleteAll();
        customersRepository.deleteAll();
        tourGuidesRepository.deleteAll();
        userRepository.deleteAll();
    }

    public User setUpUser() {
        user = User.builder()
                .email("user@gmail.com")
                .password(passwordEncoder.encode("Password@123"))
                .createdAt(LocalDateTime.now())
                .role(Role.CUSTOMER)
                .build();

        userRepository.save(user);
        return userService.findUserByEmail("user@gmail.com");
    }

    public Customers setUpCustomers(User user) {
        CustomerDetailsDto customerDetailsDto = CustomerDetailsDto.builder()
                .ho("Surname")
                .ten("Name")
                .membership(MembershipClass.STANDARD)
                .build();
        userRepository.save(user);
        return customerService.addCustomers(customerDetailsDto, user);
    }
}
