package com.tourbooking.controller;

import com.tourbooking.config.JwtService;
import com.tourbooking.dto.Destinations.DestinationsDetailsDto;
import com.tourbooking.exception.InputException;
import com.tourbooking.exception.NotFoundException;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.DestinationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HotelsController.class)
@Import({JwtService.class})
@WithMockUser(username = "admin", roles = {"ADMIN"})
public class HotelsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DestinationService destinationService;

    private DestinationsDetailsDto sampleDto;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        sampleDto = DestinationsDetailsDto.builder()
                .id(1L)
                .name("Khách sạn ABC")
                .address("123 Đường XYZ")
                .price(1000000L)
                .rate(4.5)
                .cityId(1L)
                .description("Khách sạn gần biển")
                .build();
    }

    @Test
    void testGetHotel_Success() throws Exception {
        Mockito.when(destinationService.getHotelById(1L)).thenReturn(sampleDto);

        mockMvc.perform(get("/api/v1/admin/hotels/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Lấy thông tin khách sạn thành công"))
                .andExpect(jsonPath("$.data.name").value("Khách sạn ABC"));
    }

    @Test
    void testGetHotel_NotFound() throws Exception {
        Mockito.when(destinationService.getHotelById(1L)).thenThrow(new NotFoundException("Không tìm thấy khách sạn"));

        mockMvc.perform(get("/api/v1/admin/hotels/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Không tìm thấy khách sạn"));
    }

    @Test
    void testAddHotel_Success() throws Exception {
        Mockito.when(destinationService.addHotels(any())).thenReturn(sampleDto);

        mockMvc.perform(post("/api/v1/admin/hotels")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Thêm khách sạn thành công"))
                .andExpect(jsonPath("$.data.name").value("Khách sạn ABC"));
    }

    @Test
    void testAddHotel_InputException() throws Exception {
        Mockito.when(destinationService.addHotels(any()))
                .thenThrow(new InputException("Giá phải lớn hơn 0"));

        mockMvc.perform(post("/api/v1/admin/hotels")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Giá phải lớn hơn 0"));
    }

    @Test
    void testEditHotel_Success() throws Exception {
        Mockito.when(destinationService.editHotels(eq(1L), any())).thenReturn(sampleDto);

        mockMvc.perform(put("/api/v1/admin/hotels/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Cập nhật khách sạn thành công"))
                .andExpect(jsonPath("$.data.name").value("Khách sạn ABC"));
    }

    @Test
    void testEditHotel_InputException() throws Exception {
        Mockito.when(destinationService.editHotels(eq(1L), any()))
                .thenThrow(new InputException("Dữ liệu không hợp lệ"));

        mockMvc.perform(put("/api/v1/admin/hotels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Dữ liệu không hợp lệ"));
    }

    @Test
    void testDeleteHotel_Success() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/hotels/1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("Xoá khách sạn thành công"));
    }
}
