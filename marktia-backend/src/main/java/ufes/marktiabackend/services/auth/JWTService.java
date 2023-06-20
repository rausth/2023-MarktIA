package ufes.marktiabackend.services.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.entities.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JWTService {
    /**
     * <a href="https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx">...</a>
     */
    private static final String JWT_SECRET_KEY = "50645367566B5970337336763979244226452948404D6351655468576D5A7134";
    /**
     * Token will be valid for 60 minutes
     */
    private static final Integer JWT_EXPIRATION_TIME = 1000 * 60 * 60;

    private Key getSigninKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }

    public String getSubject(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public String generateToken(Map<String, Object> extraClaims, User user) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(User user) {
        return generateToken(new HashMap<>(), user);
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }
}
