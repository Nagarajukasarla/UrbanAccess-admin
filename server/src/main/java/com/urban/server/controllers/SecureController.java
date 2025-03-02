package com.urban.server.controllers;

import com.urban.server.request.LogoutRequest;
import com.urban.server.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SecureController {

    private final AuthService authService;

    @GetMapping("/authenticate")
    public ResponseEntity<?> authenticate() {
        return ResponseEntity.ok("Authenticated");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest request) {
        return authService.logout(request.userId);
    }
}
