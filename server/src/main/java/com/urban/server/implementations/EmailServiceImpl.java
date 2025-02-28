package com.urban.server.implementations;

import com.urban.server.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private static final String FROM_EMAIL = "nagarajukasarla79@gmail.com";
    private static final String SUBJECT = "Urban Access Email Verification";
    private static final Logger logger = Logger.getLogger(EmailServiceImpl.class.getName());

    private final MailSender mailSender;

    @Override
    public Boolean sendOTPMail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject(SUBJECT);
            message.setText("Your OTP for Urban Access verification is: " + otp + 
                            "\nThis OTP will expire in 1 minute.");

            mailSender.send(message);
            logger.info("OTP sent successfully to " + to);
            return true;
        } catch (MailException e) {
            logger.severe("Failed to send OTP email to " + to + ": " + e.getMessage());
            return false;
        } catch (Exception e) {
            logger.severe("Unexpected error sending OTP email to " + to + ": " + e.getMessage());
            return false;
        }
    }
}
