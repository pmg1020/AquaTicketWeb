
package com.aquaticket.aquaticketback.booking.controller;

import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.dto.ConfirmRequestDto;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeRequest;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeResponse;
import com.aquaticket.aquaticketback.booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking") // Changed to /api/booking to match the frontend request path
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/showtimes/{showtimeId}/availability")
    public ResponseEntity<List<com.aquaticket.aquaticketback.booking.dto.SeatAvailabilityDto>> getSeatAvailability(@PathVariable Long showtimeId) {
        return ResponseEntity.ok(bookingService.getSeatAvailability(showtimeId));
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

    @PostMapping("/confirm")
    public ResponseEntity<com.aquaticket.aquaticketback.booking.dto.ConfirmResponse> confirmBooking(@RequestBody ConfirmRequestDto request) {
        Long bookingId = bookingService.confirmBooking(request);
        return ResponseEntity.ok(new com.aquaticket.aquaticketback.booking.dto.ConfirmResponse(bookingId, "Booking confirmed successfully."));
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
}
