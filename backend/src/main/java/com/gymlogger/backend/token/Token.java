package com.gymlogger.backend.token;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("Token")
public class Token {
    @Id
    private String userEmail;

    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;
    
    private boolean revoked;

    @TimeToLive
    private int expiration;
}
