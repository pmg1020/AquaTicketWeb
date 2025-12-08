package com.aquaticket.aquaticketback.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {

        String header = req.getHeader("Authorization");
        String uri = req.getRequestURI();

        System.out.println("[JWT Filter] Request: " + req.getMethod() + " " + uri);
        System.out.println("[JWT Filter] Has Authorization header: " + (header != null));

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7).trim();
            System.out.println("[JWT Filter] Token prefix: " + token.substring(0, Math.min(20, token.length())) + "...");

            try {
                io.jsonwebtoken.Jws<io.jsonwebtoken.Claims> claims = tokenProvider.validateToken(token);
                String email = claims.getBody().getSubject();
                String role  = claims.getBody().get("role", String.class);

                System.out.println("[JWT Filter] Token validated successfully. Email: " + email + ", Role: " + role);

                List<GrantedAuthority> auths = List.of(new SimpleGrantedAuthority("ROLE_" + role));
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(email, null, auths);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                System.out.println("[JWT Filter] Token validation FAILED: " + e.getClass().getSimpleName() + " - " + e.getMessage());
                req.setAttribute("jwtError", e.getMessage());
            }
        } else {
            System.out.println("[JWT Filter] No valid Authorization header found");
        }

        chain.doFilter(req, res);
    }
}
