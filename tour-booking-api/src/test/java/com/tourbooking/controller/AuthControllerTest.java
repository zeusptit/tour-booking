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
import com.tourbooking.repository.AdminRepository;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.TourGuidesRepository;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.CustomerService;
import com.tourbooking.service.UserService;
import com.tourbooking.setup.TestDataService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    private final String API_AUTHENTICATE = "/api/v1/auth/authenticate";

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

    @Autowired
    private TestDataService testDataService;

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TourGuidesRepository tourGuidesRepository;

    @BeforeEach
    public void setUp() {
        testDataService.setUp();
    }

    @AfterEach
    public void tearDown() {
        adminRepository.deleteAll();
        customersRepository.deleteAll();
        tourGuidesRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void test_loginWithValidUser_ShouldReturnJwtToken() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("user@gmail.com");
        request.setPassword("Password@123");

        String response = mockMvc.perform(post(API_AUTHENTICATE)
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

    @Test
    public void test_UserWithNullEmail_ShouldReturnBadRequest() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail(null);
        request.setPassword("Password@123");

        mockMvc.perform(post(API_AUTHENTICATE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"message\":\"Email cannot be null!\"}"));
    }

    @Test
    public void test_UserWithNullPassword_ShouldReturnBadRequest() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("example1@gmail.com");
        request.setPassword(null);

        mockMvc.perform(post(API_AUTHENTICATE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"message\":\"Password cannot be null!\"}"));
    }

}
