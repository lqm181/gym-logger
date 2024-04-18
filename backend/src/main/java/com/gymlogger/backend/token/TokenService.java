package com.gymlogger.backend.token;

import com.gymlogger.backend.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TokenService {
    @Autowired
    TokenRepository tokenRepository;

    private final Long jwtExpiration;
    private final Long refreshTokenExpiration;
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Long, Token> hashOperations;

    private SetOperations<String, Object> setOperations;
    private final String TOKEN_KEY = "Token";

    @PostConstruct
    public void  init() {
        hashOperations = redisTemplate.opsForHash();
        setOperations = redisTemplate.opsForSet();
    }

    public TokenService (
            @Value("${app.security.jwt.expiration}") Long jwtExpiration,
            @Value("${app.security.refresh-token.expiration}") Long refreshTokenExpiration,
            RedisTemplate<String, Object> redisTemplate) {
        this.jwtExpiration = jwtExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
        this.redisTemplate = redisTemplate;
    }

    public void saveUserRefreshToken(User user, String refreshToken) {
        saveUserToken(
                user,
                refreshToken,
                TokenType.REFRESH,
                this.refreshTokenExpiration / 1000  // convert from milliseconds to seconds.
        );
    }

    public void saveUserJwtToken(User user, String jwtToken) {
        saveUserToken(
                user,
                jwtToken,
                TokenType.JWT,
                this.jwtExpiration / 1000); // convert from milliseconds to seconds.
    }

    public void saveUserToken(User user, String jwtToken, TokenType tokenType, long expiration) {
        var token = Token.builder()
                .userEmail(user.getEmail())
                .token(jwtToken)
                .tokenType(tokenType)
                .revoked(false)
                .expiration(expiration)
                .build();
        tokenRepository.save(token);
    }

    public List<Token> findAllValidTokensByEmailAndTokenType (
            String userEmail,
            TokenType tokenType
    ) {
        var tokens = tokenRepository.findByUserEmailAndTokenType(userEmail, tokenType);
        return tokens
                .stream()
                .filter(t -> !t.isRevoked())
                .collect(Collectors.toList());
    }
}
