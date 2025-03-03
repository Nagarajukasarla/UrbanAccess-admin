package com.urban.server.services;


import com.urban.server.request.PassApplicationRequest;
import org.springframework.http.ResponseEntity;

public interface PassService {
    ResponseEntity<?> saveApplication(PassApplicationRequest request);
}
