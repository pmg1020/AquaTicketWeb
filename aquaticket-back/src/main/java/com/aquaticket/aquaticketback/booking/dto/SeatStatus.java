package com.aquaticket.aquaticketback.booking.dto;

/** 좌석 상태 */
public enum SeatStatus {
    AVAILABLE,   // 예약 가능
    LOCKED,      // 임시 잠금(결제 직전 홀드)
    TAKEN        // 확정 예약됨
}
