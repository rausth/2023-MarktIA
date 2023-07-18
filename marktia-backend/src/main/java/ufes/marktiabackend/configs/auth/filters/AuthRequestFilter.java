package ufes.marktiabackend.configs.auth.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import ufes.marktiabackend.exceptionhandler.custom.NonAvailableTokenException;
import ufes.marktiabackend.services.auth.JWTService;
import ufes.marktiabackend.services.auth.UserDetailsServiceImpl;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthRequestFilter extends OncePerRequestFilter {
    private String[] AUTH_WHITELIST = {
            "/auth",
            "/address",
            "/swagger-ui",
            "/swagger-resources",
            "/swagger-ui.html",
            "/v3/api-docs",
            "/webjars"
    };

    private final JWTService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new NonAvailableTokenException("Token não fornecido.");
            }

            String token = authorizationHeader.replace("Bearer ", "");
            String subject = jwtService.getSubject(token);

            if (subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(subject);

                if (userDetails != null && !jwtService.isTokenExpired(token)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        for (String urlPattern : AUTH_WHITELIST) {
            if (request.getServletPath().startsWith(urlPattern)) {
                return true;
            }
        }

        return false;
    }
}
