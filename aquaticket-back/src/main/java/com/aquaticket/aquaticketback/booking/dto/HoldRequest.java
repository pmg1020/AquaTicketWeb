package com.aquaticket.aquaticketback.booking.dto;

import java.util.List;

public record HoldRequest(
        Long showtimeId,
        List<Long> seatIds,
        Integer minutes
) {}
