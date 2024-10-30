package com.schiau.App.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

@Service
@Log
public class TokenService {
    private static final String SECRET_KEY = "A3F5E6B78C94D1BFA4E2C8E3DBB9275EF7018F24D3BFC26D8E7E5F2DB5E8D2E1";

    public boolean verifyToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
