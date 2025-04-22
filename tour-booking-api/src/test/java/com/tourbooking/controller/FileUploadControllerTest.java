package com.tourbooking.controller;

import com.tourbooking.config.JwtService;
import com.tourbooking.model.ResponseObject;
import com.tourbooking.service.IStorageService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.file.Paths;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false) // để disable security filter cho test
@WebMvcTest(FileUploadController.class)
@Import({JwtService.class})
@WithMockUser(username = "admin", roles = {"ADMIN"})
public class FileUploadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IStorageService storageService;

    @Test
    @DisplayName("Test uploadFile - success")
    void uploadFile_Success() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "dummy".getBytes());
        when(storageService.storeFile(any())).thenReturn("test.jpg");

        mockMvc.perform(multipart("/api/v1/FileUpload")
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("upload file thanh cong"))
                .andExpect(jsonPath("$.data").value("test.jpg"));
    }

    @Test
    @DisplayName("Test uploadFile - fail")
    void uploadFile_Failure() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "dummy".getBytes());
        when(storageService.storeFile(any())).thenThrow(new RuntimeException("Cannot save file"));

        mockMvc.perform(multipart("/api/v1/FileUpload")
                        .file(file))
                .andExpect(status().isNotImplemented())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Cannot save file"))
                .andExpect(jsonPath("$.data").value(""));
    }

    @Test
    @DisplayName("Test readImageFile - success")
    void readImageFile_Success() throws Exception {
        byte[] dummyImage = new byte[]{1, 2, 3};
        when(storageService.readFileContent("test.jpg")).thenReturn(dummyImage);

        mockMvc.perform(get("/api/v1/FileUpload/files/test.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG))
                .andExpect(content().bytes(dummyImage));
    }

    @Test
    @DisplayName("Test readImageFile - not found")
    void readImageFile_NotFound() throws Exception {
        when(storageService.readFileContent("test.jpg")).thenThrow(new RuntimeException("File not found"));

        mockMvc.perform(get("/api/v1/FileUpload/files/test.jpg"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Test getUploadedFiles - success")
    void getUploadedFiles_Success() throws Exception {
        when(storageService.loadAll()).thenReturn(Stream.of(
                Paths.get("image1.jpg"),
                Paths.get("image2.jpg")
        ));

        mockMvc.perform(get("/api/v1/FileUpload"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.message").value("List files successfully"))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("Test getUploadedFiles - failure")
    void getUploadedFiles_Failure() throws Exception {
        when(storageService.loadAll()).thenThrow(new RuntimeException("Storage error"));

        mockMvc.perform(get("/api/v1/FileUpload"))
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("List files failed"))
                .andExpect(jsonPath("$.data").isArray());
    }
}
