package com.tourbooking.service;

import com.tourbooking.model.User;
import jakarta.mail.MessagingException;

public interface GmailSenderService {
    void sendEmailConfirm(Long id) throws MessagingException;
    void sendEmailResetPassword(User user) throws MessagingException;
}
