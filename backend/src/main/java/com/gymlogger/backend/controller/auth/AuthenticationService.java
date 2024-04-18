package com.gymlogger.backend.controller.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymlogger.backend.filter.JwtService;
import com.gymlogger.backend.model.Role;
import com.gymlogger.backend.model.User;
import com.gymlogger.backend.repository.UserRepository;
import com.gymlogger.backend.token.TokenRepository;
import com.gymlogger.backend.token.TokenService;
import com.gymlogger.backend.token.TokenType;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final TokenRepository tokenRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);

        // Generate new tokens and save them into database.
        var jwtToken = jwtService.generateToken(user);
        tokenService.saveUserJwtToken(user, jwtToken);
        var refreshToken = jwtService.generateRefreshToken(user);
        tokenService.saveUserRefreshToken(user, refreshToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get the user information and return the corresponding refreshToken token.
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAll(user, TokenType.JWT);
        revokeAll(user, TokenType.REFRESH);
        tokenService.saveUserJwtToken(user, jwtToken);
        tokenService.saveUserRefreshToken(user, refreshToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }

    private void revokeAll(User user, TokenType tokenType) {
        var validTokens = tokenService.findAllValidTokensByEmailAndTokenType(
                        user.getEmail(),
                        tokenType
                );

        validTokens.forEach(token -> {
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    public void refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        // Check if the request has JTW Authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        refreshToken = authHeader.substring((7));
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            // Check if user exist
            User user = this.repository.findByEmail(userEmail)
                    .orElseThrow();

            // Check Redis database to see if the token matched and was not revoked.
            boolean isTokenValid = tokenRepository
                    .findByToken(refreshToken)
                    .map(t -> !t.isRevoked())
                    .orElse(false);

            // Generate new access token and override the one in database.
            if (isTokenValid && jwtService.isTokenValid(refreshToken, user)) {
               var accessToken = jwtService.generateToken(user);
               revokeAll(user, TokenType.JWT);
               tokenService.saveUserJwtToken(user, accessToken);

               var authResponse = AuthenticationResponse.builder()
                       .accessToken(accessToken)
                       .refreshToken(refreshToken)
                       .userId(user.getId())
                       .email(userEmail)
                       .build();
               new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
