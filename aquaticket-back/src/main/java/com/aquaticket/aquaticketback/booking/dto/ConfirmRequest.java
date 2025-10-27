package com.aquaticket.aquaticketback.booking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/** 좌석 확정(결제 완료) 요청 바디 */
@Getter
@NoArgsConstructor
public class ConfirmRequest {
    private Long showId;          // 상영/회차 ID
    private List<Long> seatIds;   // 확정할 좌석들
}
