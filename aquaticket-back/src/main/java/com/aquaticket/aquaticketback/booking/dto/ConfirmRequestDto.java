package com.aquaticket.aquaticketback.booking.dto;

import java.util.List;

public class ConfirmRequestDto {
    private Long showtimeId;
    private List<Long> seatIds;

    // Getters and Setters
    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public List<Long> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Long> seatIds) {
        this.seatIds = seatIds;
    }
}
