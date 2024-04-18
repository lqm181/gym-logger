package com.gymlogger.backend.token;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, String> {

    public List<Token> findByUserEmailAndTokenType(String usreEmail, TokenType tokenType);
    public Optional<Token> findByToken(String token);
}
