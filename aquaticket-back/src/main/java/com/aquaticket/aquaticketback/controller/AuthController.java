package com.aquaticket.aquaticketback.controller;

import com.aquaticket.aquaticketback.config.JwtTokenProvider;
import com.aquaticket.aquaticketback.dto.LoginRequest;
import com.aquaticket.aquaticketback.dto.RegisterRequest;
import com.aquaticket.aquaticketback.domain.User;
import com.aquaticket.aquaticketback.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtTokenProvider jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest req) {
        if (users.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }
        User u = new User();
        u.setEmail(req.getEmail());
        u.setName(req.getName());
        u.setPasswordHash(encoder.encode(req.getPassword()));
        u.setRole("USER");
        users.save(u);

        String token = jwt.createToken(u.getEmail(), u.getRole());
        return ResponseEntity.ok(Map.of(
                "accessToken", token,
                "tokenType", "Bearer",
                "profile", Map.of("email", u.getEmail(), "name", u.getName(), "role", u.getRole())
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req) {
        User u = users.findByEmail(req.getEmail()).orElse(null);
        if (u == null || u.getPasswordHash() == null || !encoder.matches(req.getPassword(), u.getPasswordHash())) {
            return ResponseEntity.status(401).body("이메일/비밀번호가 올바르지 않습니다.");
        }
        String token = jwt.createToken(u.getEmail(), u.getRole());
        return ResponseEntity.ok(Map.of(
                "accessToken", token,
                "tokenType", "Bearer",
                "profile", Map.of("email", u.getEmail(), "name", u.getName(), "role", u.getRole())
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(org.springframework.security.core.Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof String)) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }
        String email = (String) authentication.getPrincipal();
        User u = users.findByEmail(email).orElse(null);
        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "email", email,
                "name", u != null ? u.getName() : "",
                "role", u != null ? u.getRole() : "USER"
        ));
    }
}
