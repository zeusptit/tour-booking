package com.tourbooking.service.Impl;

import com.tourbooking.exception.InputException;
import com.tourbooking.exception.UserException;
import com.tourbooking.model.User;
import com.tourbooking.repository.UserRepository;
import com.tourbooking.service.GmailSenderService;
import com.tourbooking.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private GmailSenderService gmailSenderService;
    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public void resetPassword(Map<String, String> resetInfo) throws UserException {
        String token = resetInfo.get("token");
        String newPassword = resetInfo.get("newPassword");
        if(newPassword != null && newPassword.length() < 8)
            throw new InputException("Mật khẩu phải dài hơn 8 kí tự");
        User user = userRepository.findByResetPasswordToken(token);
        if (user == null) throw new UserException("Link không tồn tại hoặc đã hết hạn");
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    @Override
    public void forgotPassword(String email) throws UserException, MessagingException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new UserException("Địa chỉ email không tồn tại");
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        User user1 = userRepository.save(user);
        gmailSenderService.sendEmailResetPassword(user1);
    }
}
