package com.gymlogger.backend.token;

import com.gymlogger.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    @Autowired
    TokenRepository tokenRepository;


    public void saveUserJwtToken(User user, String jwtToken) {
        saveUserToken(user,
                jwtToken,
                TokenType.JWT,
                60 * 60 * 6); // token only last for 6 hours.
    }

    public void saveUserToken(User user, String jwtToken, TokenType tokenType, int expiration) {
        var token = Token.builder()
                .userEmail(user.getEmail())
                .token(jwtToken)
                .tokenType(tokenType)
                .revoked(false)
                .expiration(expiration)
                .build();
        tokenRepository.save(token);
    }
}
