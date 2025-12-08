
package com.aquaticket.aquaticketback.booking.controller;

import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeRequest;
import com.aquaticket.aquaticketback.booking.dto.EnsureShowtimeResponse;
import com.aquaticket.aquaticketback.booking.dto.ConfirmResponse;
import com.aquaticket.aquaticketback.booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

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

    // --- 임시 예매 확정 엔드포인트 ---
    @PostMapping("/confirm")
    public ResponseEntity<com.aquaticket.aquaticketback.booking.dto.ConfirmResponse> confirmBooking() {
        // 실제 데이터베이스 작업 없이 더미 ID 반환
        return ResponseEntity.ok(new com.aquaticket.aquaticketback.booking.dto.ConfirmResponse(123L, "OK"));
    }
    // --- 임시 예매 확정 엔드포인트 끝 ---

}
