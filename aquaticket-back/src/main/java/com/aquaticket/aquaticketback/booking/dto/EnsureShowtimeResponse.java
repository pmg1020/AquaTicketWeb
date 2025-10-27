package com.aquaticket.aquaticketback.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsureShowtimeResponse {
    private Long showtimeId; // Integer에서 Long으로 변경
}