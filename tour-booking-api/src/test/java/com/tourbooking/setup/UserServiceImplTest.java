package com.tourbooking.setup;

import com.tourbooking.exception.InputException;
import com.tourbooking.exception.UserException;
import com.tourbooking.model.User;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.GmailSenderService;
import com.tourbooking.service.Impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private GmailSenderService gmailSenderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindUserByEmail_WhenExists() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        User result = userService.findUserByEmail(email);
        assertEquals(email, result.getEmail());
    }

    @Test
    void testFindUserByEmail_WhenNotFound() {
        String email = "notfound@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        User result = userService.findUserByEmail(email);
        assertNull(result);
    }

    @Test
    void testResetPassword_Success() {
        String token = UUID.randomUUID().toString();
        String newPassword = "newStrongPassword";
        User user = new User();
        user.setResetPasswordToken(token);

        when(userRepository.findByResetPasswordToken(token)).thenReturn(user);
        when(passwordEncoder.encode(newPassword)).thenReturn("hashedPassword");

        userService.resetPassword(Map.of("token", token, "newPassword", newPassword));

        verify(userRepository).save(user);
        assertNull(user.getResetPasswordToken());
        assertEquals("hashedPassword", user.getPassword());
    }

    @Test
    void testResetPassword_InvalidPasswordLength() {
        String token = UUID.randomUUID().toString();
        String newPassword = "short";

        InputException ex = assertThrows(InputException.class, () ->
                userService.resetPassword(Map.of("token", token, "newPassword", newPassword)));

        assertEquals("Mật khẩu phải dài hơn 8 kí tự", ex.getMessage());
    }

    @Test
    void testResetPassword_UserNotFound() {
        String token = UUID.randomUUID().toString();
        String newPassword = "validPassword";

        when(userRepository.findByResetPasswordToken(token)).thenReturn(null);

        UserException ex = assertThrows(UserException.class, () ->
                userService.resetPassword(Map.of("token", token, "newPassword", newPassword)));

        assertEquals("Link không tồn tại hoặc đã hết hạn", ex.getMessage());
    }

    @Test
    void testForgotPassword_Success() throws Exception {
        String email = "forgot@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        userService.forgotPassword(email);

        assertNotNull(user.getResetPasswordToken());
        verify(gmailSenderService).sendEmailResetPassword(user);
    }

    @Test
    void testForgotPassword_EmailNotFound() {
        String email = "notfound@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        UserException ex = assertThrows(UserException.class, () ->
                userService.forgotPassword(email));

        assertEquals("Địa chỉ email không tồn tại", ex.getMessage());
    }
}
