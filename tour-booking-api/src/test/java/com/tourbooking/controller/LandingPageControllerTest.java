package com.tourbooking.controller;

import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Cities.CitiesDetailsDto;
import com.tourbooking.dto.Cities.CitiesSummaryDto;
import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.dto.Packages.PackagesDetailsDto;
import com.tourbooking.dto.Packages.PackagesSummaryDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.UserException;
import com.tourbooking.model.DestinationType;
import com.tourbooking.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.BDDMockito.*;

@Import({JwtService.class})
@WithMockUser(username = "admin", roles = {"ADMIN"})
@WebMvcTest(LandingPageController.class)
public class LandingPageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VouchersService vouchersService;
    @MockBean
    private CitiesService citiesService;
    @MockBean
    private PackagesService packagesService;
    @MockBean
    private UserService userService;
    @MockBean
    private DestinationService destinationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllCities() throws Exception {
        List<CitiesSummaryDto> cities = List.of(new CitiesSummaryDto());
        given(citiesService.getAllCities()).willReturn(cities);

        mockMvc.perform(get("/api/v1/public/getAllCities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay danh sach cities thanh cong"));
    }

    @Test
    void testGetCityById() throws Exception {
        CitiesDetailsDto city = new CitiesDetailsDto();
        given(citiesService.getCityById(1L)).willReturn(city);

        mockMvc.perform(get("/api/v1/public/getCity/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay thong tin cities thanh cong"));
    }

    @Test
    void testSearch() throws Exception {
        List<PackagesSummaryDto> results = List.of(new PackagesSummaryDto());
        given(packagesService.searchPackages(anyLong(), anyString(), anyLong(), anyLong(), anyLong())).willReturn(results);

        mockMvc.perform(get("/api/v1/public/search?city=1&date=2024-04-01&person=2&priceRange=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay danh sach packages thanh cong"));
    }

    @Test
    void testGetPackageDetailsBySlug() throws Exception {
        PackagesDetailsDto details = new PackagesDetailsDto();
        given(packagesService.getPackagesBySlug("abc"))
                .willReturn(details);

        mockMvc.perform(get("/api/v1/public/getPackageDetailsBySlug/abc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay package thanh cong"));
    }

    @Test
    void testGetPackageDetailsById() throws Exception {
        PackagesDetailsDto details = new PackagesDetailsDto();
        given(packagesService.getPackagesById(1L)).willReturn(details);

        mockMvc.perform(get("/api/v1/public/getPackageDetails/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay package thanh cong"));
    }

    @Test
    void testGetThreeNearestPackage() throws Exception {
        List<PackagesSummaryDto> list = List.of(new PackagesSummaryDto());
        given(packagesService.findThreeNearestPackage()).willReturn(list);

        mockMvc.perform(get("/api/v1/public/getThreeNearestPackage"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay danh sach packages thanh cong"));
    }

    @Test
    void testForgotPassword() throws Exception {
        Map<String, String> payload = Map.of("email", "test@example.com");

        mockMvc.perform(post("/api/v1/public/forgotPassword")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Gửi email đặt lại mật khẩu thành công"));
    }

    @Test
    void testResetPassword() throws Exception {
        Map<String, String> payload = Map.of("email", "test@example.com", "password", "123456");

        mockMvc.perform(post("/api/v1/public/resetPassword")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Đặt lại mật khẩu thành công"));
    }

    @Test
    void testGetAllHotels() throws Exception {
        List<DestinationsDetailsDto> hotels = List.of(new DestinationsDetailsDto());
        given(destinationService.getAllHotels()).willReturn(hotels);

        mockMvc.perform(get("/api/v1/public/getAllHotels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay danh sach hotels thanh cong"));
    }

    @Test
    void testGetPageHotels() throws Exception {
        Page<DestinationsDetailsDto> page = new PageImpl<>(List.of(new DestinationsDetailsDto()), PageRequest.of(0, 10), 1);
        given(destinationService.getPageDestination(eq(DestinationType.HOTEL), anyInt(), anyInt())).willReturn(page);

        mockMvc.perform(get("/api/v1/public/getHotels?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách khách sạn thành công"));
    }

    @Test
    void testGetAllPlacesOfVisit() throws Exception {
        List<DestinationsDetailsDto> list = List.of(new DestinationsDetailsDto());
        given(destinationService.getAllPlacesOfVisit()).willReturn(list);

        mockMvc.perform(get("/api/v1/public/getAllPlacesOfVisit"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay danh sach place thanh cong"));
    }

    @Test
    void testGetPagePlacesOfVisit() throws Exception {
        Page<DestinationsDetailsDto> page = new PageImpl<>(List.of(new DestinationsDetailsDto()), PageRequest.of(0, 10), 1);
        given(destinationService.getPageDestination(eq(DestinationType.PLACES_OF_VISIT), anyInt(), anyInt())).willReturn(page);

        mockMvc.perform(get("/api/v1/public/getPlaces?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách điểm đến thành công"));
    }

    @Test
    void testGetDestinationDetails() throws Exception {
        DestinationsDetailsDto destination = new DestinationsDetailsDto();
        given(destinationService.getDestinationsBySlug("hanoi"))
                .willReturn(destination);

        mockMvc.perform(get("/api/v1/public/getDestination/hanoi"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lay places of visit thanh cong"));
    }
    @Test
    void testResetPassword_Success() throws Exception {
        Map<String, String> resetInfo = new HashMap<>();
        resetInfo.put("email", "test@example.com");
        resetInfo.put("newPassword", "newPass123");

        mockMvc.perform(post("/api/v1/public/resetPassword")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Đặt lại mật khẩu thành công"))
                .andExpect(jsonPath("$.data").value(true));
    }

    @Test
    void testResetPassword_UserException() throws Exception {
        Map<String, String> resetInfo = new HashMap<>();
        resetInfo.put("email", "invalid@example.com");

        doThrow(new UserException("Tài khoản không tồn tại")).when(userService).resetPassword(resetInfo);

        mockMvc.perform(post("/api/v1/public/resetPassword")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Tài khoản không tồn tại"))
                .andExpect(jsonPath("$.data").value(false));
    }

    @Test
    void testResetPassword_InputException() throws Exception {
        Map<String, String> resetInfo = new HashMap<>();
        resetInfo.put("email", "test@example.com");

        doThrow(new InputException("Mật khẩu không hợp lệ")).when(userService).resetPassword(resetInfo);

        mockMvc.perform(post("/api/v1/public/resetPassword")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Mật khẩu không hợp lệ"))
                .andExpect(jsonPath("$.data").value(false));
    }

    private List<PackagesSummaryDto> mockPackages;

    @BeforeEach
    void setUp() {
        PackagesSummaryDto pkg = new PackagesSummaryDto();
        pkg.setId(1L);
        pkg.setName("Test Package");
        mockPackages = Arrays.asList(pkg);
    }

    @Test
    void testSearch_DefaultParams_ReturnsSuccess() throws Exception {
        when(packagesService.searchPackages(0L, "0", 1L, 0L, 10000000L)).thenReturn(mockPackages);

        mockMvc.perform(get("/api/v1/public/search")
                        .param("city", "0")
                        .param("date", "0")
                        .param("person", "1")
                        .param("priceRange", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Lay danh sach packages thanh cong"))
                .andExpect(jsonPath("$.data[0].id").value(1));
    }

    @Test
    void testSearch_PriceRange2_ReturnsCorrectMinMaxCost() throws Exception {
        when(packagesService.searchPackages(2L, "2025-12-12", 3L, 1000000L, 2000000L))
                .thenReturn(mockPackages);

        mockMvc.perform(get("/api/v1/public/search")
                        .param("city", "2")
                        .param("date", "2025-12-12")
                        .param("person", "3")
                        .param("priceRange", "2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].id").value(1));
    }

}
