
package com.aquaticket.aquaticketback.booking.controller;

import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeRequest;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeResponse;
import com.aquaticket.aquaticketback.booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/booking") // Changed to /api/booking to match the frontend request path

public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;

    }

    @GetMapping("/me")
    public ResponseEntity<List<BookingHistoryDto>> getMyBookings() {
        return ResponseEntity.ok(bookingService.getMyBookings());
    }

    @PostMapping("/showtimes/ensure")
    public ResponseEntity<EnsureShowtimeResponse> ensureShowtime(@RequestBody EnsureShowtimeRequest request) {
        Long showtimeId = bookingService.ensureShowtime(request.getKopisId(), request.getStartAt());
        return ResponseEntity.ok(new EnsureShowtimeResponse(showtimeId));
    }

}
