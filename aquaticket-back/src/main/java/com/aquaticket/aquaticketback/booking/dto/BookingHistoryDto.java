package com.aquaticket.aquaticketback.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingHistoryDto {
    private Long bookingId;
    private String performanceTitle;
    private String posterUrl;
    private String viewingDate;
    private String bookingDate;
    private String bookingNumber;
    private int totalPrice;
    private String status;
}
