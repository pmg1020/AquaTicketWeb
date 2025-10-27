package com.aquaticket.aquaticketback.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatAvailabilityDto {
    private Long seatId;
    private String rowLabel;   // 예: "A"
    private Integer seatNo;    // 예: 12
    private Integer price;     // 가격 정보가 있으면 채워주세요(없으면 null 가능)
    private SeatStatus status; // AVAILABLE / LOCKED / TAKEN
}
