// src/main/java/com/aquaticket/aquaticketback/config/oauth/OAuth2SuccessHandler.java
package com.aquaticket.aquaticketback.config.oauth;

import com.aquaticket.aquaticketback.config.JwtTokenProvider;
import com.aquaticket.aquaticketback.domain.User;
import com.aquaticket.aquaticketback.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2SuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    private final JwtTokenProvider jwt;
    private final UserRepository userRepository;

    // 프론트 콜백 페이지 (반드시 프론트 라우터에 존재)
    private static final String FRONT_CALLBACK = "http://localhost:5173/login/callback";

    public OAuth2SuccessHandler(JwtTokenProvider jwt, UserRepository userRepository) {
        this.jwt = jwt;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
            throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) auth.getPrincipal();

        // 카카오는 "kakao_account.email" 을 scope로 허용해야 이메일이 옵니다.
        String email = extractEmail(oAuth2User);
        String name  = extractName(oAuth2User);

        // 우리 시스템의 사용자로 보장(없으면 가입)
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setEmail(email);
            u.setName(name != null ? name : "카카오유저");
            u.setRole("USER");
            return userRepository.save(u);
        });

        // JWT 발급 (메서드명은 프로젝트에 맞게 변경: createToken / generateToken 등)
        String token = jwt.createToken(user.getEmail(), user.getRole());

        // 토큰 URL 인코딩
        String q = URLEncoder.encode(token, StandardCharsets.UTF_8);
        res.sendRedirect(FRONT_CALLBACK + "?token=" + q);
    }

    private String extractEmail(OAuth2User user) {
        // kakao: { kakao_account: { email: ... } }
        Object acc = user.getAttributes().get("kakao_account");
        if (acc instanceof java.util.Map<?,?> map) {
            Object email = map.get("email");
            return email != null ? email.toString() : null;
        }
        // 표준 키로 들어오는 경우도 대비
        Object email = user.getAttributes().get("email");
        return email != null ? email.toString() : null;
    }

    private String extractName(OAuth2User user) {
        // kakao: { properties: { nickname: ... } }
        Object props = user.getAttributes().get("properties");
        if (props instanceof java.util.Map<?,?> map) {
            Object nick = map.get("nickname");
            if (nick != null) return nick.toString();
        }
        Object name = user.getAttributes().get("name");
        return name != null ? name.toString() : null;
    }
}
