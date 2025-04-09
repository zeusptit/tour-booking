package com.tourbooking.controller.packages;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.model.Packages;
import com.tourbooking.repository.AdminRepository;
import com.tourbooking.repository.CustomersRepository;
import com.tourbooking.repository.PackagesRepository;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.ConvertToDtoService;
import com.tourbooking.service.PackagesService;
import com.tourbooking.setup.TestDataService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GetPackageByIdTest {

    private static final String API_GET_PACKAGE_BY_ID = "/api/v1/admin/packages/";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PackagesService packagesService;

    @Autowired
    private PackagesRepository packagesRepository;

    @Autowired
    private ConvertToDtoService convertToDtoService;

    private static final LocalDate NOW = LocalDate.now();
    private Packages packages;
    private PackagesDetailsDto packagesDetailsDto;
    @Autowired
    private TestDataService testDataService;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CustomersRepository customersRepository;
    @Autowired
    private UserRepository userRepository;


    @BeforeEach
    public void setUp() {
        packagesRepository.deleteAll();
        packages = setUpPackages();
    }

    private Packages setUpPackages() {
        Packages packages1 = Packages.builder()
                .name("Ha Long")
                .capacity(3L)
                .available(3L)
                .cost(1000000L)
                .startDate(NOW)
                .endDate(NOW.plusMonths(1))
                .build();
        convertToDtoService.toPackagesBasicDto(packages1);
        return packagesRepository.save(packages1);
    }

    @AfterEach
    public void tearDown() {
        packagesRepository.deleteAll();
        adminRepository.deleteAll();
        customersRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void test_WithValidData_ShouldReturnOk() throws Exception {
        String jwt = testDataService.generateAdminToken();
        String response = mockMvc.perform(get("/api/v1/admin/packages/{id}", packages.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(packagesDetailsDto))
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        JsonNode jsonNode = objectMapper.readTree(response);
        assertThat(jsonNode.hasNonNull("data")).isTrue();

        assertEquals(packages.getName(), jsonNode.get("data").get("name").asText());
        assertEquals(packages.getCapacity(), jsonNode.get("data").get("capacity").asLong());
        assertEquals(packages.getAvailable(), jsonNode.get("data").get("available").asLong());
        assertEquals(packages.getCost(), jsonNode.get("data").get("cost").asLong());
        assertEquals(packages.getStartDate().toString(), jsonNode.get("data").get("startDate").asText());
        assertEquals(packages.getEndDate().toString(), jsonNode.get("data").get("endDate").asText());

    }
}
