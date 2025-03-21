package com.tourbooking.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tourbooking.auth.AuthenticationRequest;
import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Customer.CustomerDetailsDto;
import com.tourbooking.model.MembershipClass;
import com.tourbooking.model.Role;
import com.tourbooking.model.User;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.CustomerService;
import com.tourbooking.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomersRepository customersRepository;

    @BeforeEach
    public void setUp() {
        customersRepository.deleteAll();
        userRepository.deleteAll();
    }

    @AfterEach
    public void tearDown() {
        customersRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void loginWithValidUser_ShouldReturnJwtToken() throws Exception {
        setUpUser();
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("user@gmail.com");
        request.setPassword("Password@123");

        String response = mockMvc.perform(post("/api/v1/auth/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode jsonNode = objectMapper.readTree(response);
        assertThat(jsonNode.get("status").asText()).isEqualTo("ok");
        assertThat(jsonNode.hasNonNull("data")).isTrue();

        String token = jsonNode.get("data").get("token").asText();
        assertThat(jwtService.checkToken(token)).isFalse();

        String username = jwtService.extractUsername(token);
        assertThat(username).isEqualTo(request.getEmail());
    }

    private void setUpUser() {
        User user = User.builder()
                .email("user@gmail.com")
                .password(passwordEncoder.encode("Password@123"))
                .createdAt(LocalDateTime.now())
                .role(Role.CUSTOMER)
                .build();

        CustomerDetailsDto customerDetailsDto = CustomerDetailsDto.builder()
                .ho("Surname")
                .ten("Name")
                .membership(MembershipClass.STANDARD)
                .build();
        userRepository.save(user);
        User user1 = userService.findUserByEmail("user@gmail.com");
        customerService.addCustomers(customerDetailsDto, user1);
    }
}
