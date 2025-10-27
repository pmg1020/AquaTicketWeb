package com.aquaticket.aquaticketback.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ConfirmResponse {
    private Long reservationId;
    private String result; // "OK" 등
}
