package com.urban.server.controllers;

import com.urban.server.implementations.PassServiceImplementation;
import com.urban.server.request.PassApplicationRequest;
import com.urban.server.services.PassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class PassController {

    private final PassService passService;

    @PostMapping(path = "/send-application")
    ResponseEntity<?> sendApplication(@RequestBody PassApplicationRequest request) {
        return passService.saveApplication(request);
    }
}
