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
    private String zone;
    private String row;
    private String number;
    private Integer price;
    private SeatStatus status;
}
