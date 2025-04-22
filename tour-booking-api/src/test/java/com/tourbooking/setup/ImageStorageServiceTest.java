package com.tourbooking.setup;

import com.tourbooking.service.Impl.ImageStorageService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

public class ImageStorageServiceTest {

    private ImageStorageService imageStorageService;
    private final Path storagePath = Paths.get("uploads");

    @BeforeEach
    void setUp() throws IOException {
        Files.createDirectories(storagePath);
        imageStorageService = new ImageStorageService();
    }

    @AfterEach
    void tearDown() throws IOException {
        // Xoá tất cả file test sau mỗi test case
        Files.walk(storagePath, 1)
                .filter(path -> !path.equals(storagePath))
                .forEach(path -> {
                    try {
                        Files.delete(path);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }

    @Test
    void testStoreFileSuccess() {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test-image.jpg", "image/jpeg", "fake image content".getBytes()
        );

        String fileName = imageStorageService.storeFile(file);
        assertNotNull(fileName);
        assertTrue(fileName.endsWith(".jpg"));

        Path savedFile = storagePath.resolve(fileName);
        assertTrue(Files.exists(savedFile));
    }

    @Test
    void testStoreFileWithInvalidExtension() {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.txt", "text/plain", "not an image".getBytes()
        );

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageStorageService.storeFile(file);
        });
        assertEquals("Not image", exception.getMessage());
    }

    @Test
    void testStoreEmptyFile() {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.jpg", "image/jpeg", new byte[0]
        );

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageStorageService.storeFile(file);
        });
        assertEquals("Empty file", exception.getMessage());
    }

    @Test
    void testStoreFileExceedsSizeLimit() {
        byte[] largeContent = new byte[21 * 1024 * 1024]; // > 20MB
        MockMultipartFile file = new MockMultipartFile(
                "file", "large.jpg", "image/jpeg", largeContent
        );

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageStorageService.storeFile(file);
        });
        assertEquals("File must be <= 20Mb", exception.getMessage());
    }

    @Test
    void testLoadAllFiles() throws IOException {
        // Save file
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.jpg", "image/jpeg", "test".getBytes()
        );
        String savedFile = imageStorageService.storeFile(file);

        Stream<Path> files = imageStorageService.loadAll();
        assertTrue(files.anyMatch(path -> path.toString().equals(savedFile)));
    }

    @Test
    void testReadFileContentSuccess() {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.jpg", "image/jpeg", "test image content".getBytes()
        );
        String savedFile = imageStorageService.storeFile(file);

        byte[] content = imageStorageService.readFileContent(savedFile);
        assertEquals("test image content", new String(content));
    }

    @Test
    void testReadFileContentFail() {
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageStorageService.readFileContent("nonexistent.jpg");
        });
        assertTrue(exception.getMessage().contains("Could not read file"));
    }
}
