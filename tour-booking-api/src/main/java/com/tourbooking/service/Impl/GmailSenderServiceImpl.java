package com.tourbooking.service.Impl;

import com.tourbooking.model.Bookings;
import com.tourbooking.model.User;
import com.tourbooking.repository.BookingsRepository;
import com.tourbooking.service.GmailSenderService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class GmailSenderServiceImpl implements GmailSenderService{

    private Logger LOGGER = LoggerFactory.getLogger(GmailSenderServiceImpl.class);
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private BookingsRepository bookingsRepository;

    @Override
    @Async
    public void sendEmailConfirm(Long id) throws MessagingException {
        Bookings bookings = bookingsRepository.findById(id).orElse(null);
        Context context = new Context();
        context.setVariable("booking", bookings);
        context.setVariable("customer", bookings.getCustomers());
        context.setVariable("package", bookings.getPackages());

        String process = templateEngine.process("confirmEmail", context);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true, "UTF-8");
        helper.setSubject("Xác nhận đơn hàng " + bookings.getCode() + " từ Thanh Hương Booking");
        helper.setText(process, true);
        helper.setTo(bookings.getCustomers().getUser().getEmail());
        emailSender.send(mimeMessage);
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("ducnmpad@gmail.com");
//        message.setTo(toEmail);
//        message.setSubject(subject);
//        message.setText(body);
//
//        emailSender.send(message);

        LOGGER.info("Gửi email xác nhận thanh toán cho đơn hàng " + bookings.getCode() + " thành công");
       // System.out.println("Gửi email xác nhận thanh toán cho đơn hàng" + bookings.getCode() + "thành công");
    }

    @Override
    public void sendEmailResetPassword(User user) throws MessagingException {
        Context context = new Context();
        String link = "http://localhost:3000/resetPassword?token=" + user.getResetPasswordToken();
        context.setVariable("link", link);

        String process = templateEngine.process("resetPasswordEmail", context);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true, "UTF-8");
        helper.setSubject("Thông báo đặt lại mật khẩu từ Thanh Hương Booking");
        helper.setText(process, true);
        helper.setTo(user.getEmail());
        emailSender.send(mimeMessage);
        LOGGER.info("Gửi email đặt lại mật khẩu tới " +user.getEmail() + " thành công");
    }
}
