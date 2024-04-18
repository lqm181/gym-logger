package com.gymlogger.backend.token;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("Token")
public class Token {
    @Id
    @GeneratedValue
    private Long id;

    @Indexed
    private String userEmail;

    @Indexed
    private String token;

    @Enumerated(EnumType.STRING)
    @Indexed
    private TokenType tokenType;
    
    private boolean revoked;

    @TimeToLive
    private long expiration;
}
