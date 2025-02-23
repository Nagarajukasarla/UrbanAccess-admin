package com.urban.server.services;

import com.urban.server.request.AuthenticationRequest;
import com.urban.server.request.RegisterRequest;
import com.urban.server.response.AuthenticationResponse;

public interface AuthService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
