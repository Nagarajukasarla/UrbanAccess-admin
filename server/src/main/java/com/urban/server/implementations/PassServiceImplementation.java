package com.urban.server.implementations;

import com.urban.server.dto.NativeUserDto;
import com.urban.server.dto.UserPassDto;
import com.urban.server.models.NativeUser;
import com.urban.server.models.UserPass;
import com.urban.server.repository.NativeUserRepository;
import com.urban.server.repository.UserPassRepository;
import com.urban.server.request.PassApplicationRequest;
import com.urban.server.services.PassService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PassServiceImplementation implements PassService {

    private final NativeUserRepository nativeUserRepository;
    private final UserPassRepository userPassRepository;

    @Override
    public ResponseEntity<?> saveApplication(PassApplicationRequest request) {
        try {
            // Save the native user; if the user already exists, this method simply returns.
            saveNativeUser(request.getNativeUserDto());

            // Save the pass if provided
            if (request.getUserPassDto() != null) {
                saveUserPass(request.getUserPassDto());
            }
            return ResponseEntity.ok("Successfully saved application");
        } catch (Exception e) {
            log.error("Error saving application: {}", e.getMessage());
            String errorMessage = e.getMessage();
            if (errorMessage.contains("Unable to save user")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to save user");
            } else if (errorMessage.contains("NativeUser not found with id")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NativeUser not found with id");
            } else if (errorMessage.contains("Error saving UserPass")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving UserPass");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to save application");
        }
    }

    private void saveNativeUser(NativeUserDto nativeUserDto) throws Exception {
        try {
            // Check if the user already exists (assuming findByEmail is defined)
            var existingUserOptional = nativeUserRepository.findByEmail(nativeUserDto.getEmail());
            if (existingUserOptional.isPresent()) {
                // If user exists, simply return.
                return;
            }

            // Map DTO to entity
            var nativeUser = NativeUser.builder()
                    .surname(nativeUserDto.getSurname())
                    .lastname(nativeUserDto.getLastname())
                    .dateOfBirth(nativeUserDto.getDateOfBirth())
                    .gender(nativeUserDto.getGender())
                    .guardian(nativeUserDto.getGuardian())
                    .email(nativeUserDto.getEmail())
                    .phone(nativeUserDto.getPhone())
                    .aadhar(nativeUserDto.getAadhar())
                    .houseNumber(nativeUserDto.getHouseNumber())
                    .street(nativeUserDto.getStreet())
                    .area(nativeUserDto.getArea())
                    .district(nativeUserDto.getDistrict())
                    .city(nativeUserDto.getCity())
                    .state(nativeUserDto.getState())
                    .country(nativeUserDto.getCountry())
                    .pincode(nativeUserDto.getPincode())
                    .route(nativeUserDto.getRoute())
                    .education(nativeUserDto.getEducation())
                    .imageUri(nativeUserDto.getImageUri())
                    .build();

            nativeUserRepository.save(nativeUser);
        } catch (DataIntegrityViolationException e) {
            log.error("Data integrity violation when saving NativeUser: {}", e.getMessage());
            throw new Exception("Unable to save user " + nativeUserDto.getEmail(), e);
        } catch (Exception e) {
            log.error("Error saving NativeUser: {}", e.getMessage());
            throw new Exception("Unable to save user " + nativeUserDto.getEmail(), e);
        }
    }

    private void saveUserPass(UserPassDto userPassDto) throws Exception {
        try {
            // Retrieve the NativeUser using nativeUserId from the pass DTO
            var nativeUser = nativeUserRepository.findById(userPassDto.getNativeUserId())
                    .orElseThrow(() -> new DataIntegrityViolationException("NativeUser not found with id: " + userPassDto.getNativeUserId()));

            // Map DTO to entity
            UserPass userPass = UserPass.builder()
                    .nativeUserId(userPassDto.getNativeUserId())
                    .mrn(userPassDto.getMrn())
                    .name(userPassDto.getName())
                    .age(userPassDto.getAge())
                    .gender(userPassDto.getGender())
                    .phone(userPassDto.getPhone())
                    .validity(userPassDto.getValidity())
                    .type(userPassDto.getType())
                    .dob(userPassDto.getDob())
                    .status(userPassDto.getStatus())
                    .divisionId(userPassDto.getDivisionId())
                    .adminId(userPassDto.getAdminId())
                    .processedAt(userPassDto.getProcessedAt())
                    .build();

            userPassRepository.save(userPass);
        } catch (DataIntegrityViolationException e) {
            log.error("Data integrity violation when saving UserPass: {}", e.getMessage());
            throw new Exception("NativeUser not found with id: " + userPassDto.getNativeUserId(), e);
        } catch (Exception e) {
            log.error("Error saving UserPass: {}", e.getMessage());
            throw new Exception("Error saving UserPass: " + e.getMessage(), e);
        }
    }
}
