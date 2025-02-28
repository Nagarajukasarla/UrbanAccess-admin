package com.urban.server.procedure;

import com.urban.server.repository.AdminRepository;
import com.urban.server.request.OTPVerificationRequest;
import com.urban.server.response.AuthenticationResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class OTPVerificationProcedure {

    @PersistenceContext
    private EntityManager entityManager;

    private final AdminRepository adminRepository;
    private static final Logger logger = Logger.getLogger(OTPVerificationProcedure.class.getName());

    public ResponseEntity<AuthenticationResponse> verifyOtp(OTPVerificationRequest request) {
        try {
            // Create a stored procedure query
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("verify_otp");

            // Register input parameters
            query.registerStoredProcedureParameter("p_email", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("p_otp", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("is_valid", Boolean.class, ParameterMode.OUT);

            // Set input parameters
            query.setParameter("p_email", request.email);
            query.setParameter("p_otp", request.otp);

            // Execute the stored procedure
            query.execute();
            // Retrieve the OUT parameter value
            Boolean isValid = (Boolean) query.getOutputParameterValue("is_valid");

            if (isValid) {
                // Mark email as verified
                var admin = adminRepository.findByEmail(request.email)
                        .orElseThrow(() -> new RuntimeException("Admin not found"));

                admin.setIsEmailVerified(true);
                adminRepository.save(admin);

                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            logger.severe("OTP verification error: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}