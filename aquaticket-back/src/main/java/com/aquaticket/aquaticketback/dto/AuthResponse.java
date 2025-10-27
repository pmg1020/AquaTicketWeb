package com.aquaticket.aquaticketback.dto;

import java.util.Map;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long   expiresIn,
        Map<String, Object> user
) {}
