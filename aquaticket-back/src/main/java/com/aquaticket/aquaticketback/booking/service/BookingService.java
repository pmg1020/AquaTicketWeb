package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.repository.BookingRepository;
import com.aquaticket.aquaticketback.booking.repository.ShowtimeRepository;
import com.aquaticket.aquaticketback.booking.repository.ShowRepository;
import com.aquaticket.aquaticketback.booking.domain.Showtime;
import com.aquaticket.aquaticketback.booking.domain.Show;
import com.aquaticket.aquaticketback.domain.User;
import com.aquaticket.aquaticketback.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final ShowRepository showRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, ShowtimeRepository showtimeRepository, ShowRepository showRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.showRepository = showRepository;
    }

    @Transactional(readOnly = true)
    public List<BookingHistoryDto> getMyBookings() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUser(user).stream()
                .map(booking -> new BookingHistoryDto(
                        booking.getId(),
                        booking.getShow().getPerformance().getTitle(),
                        booking.getShow().getPerformance().getPosterUrl(),
                        // getStartTime() -> getStartAt() 으로 수정
                        booking.getShowtime().getStartAt().toString(),
                        booking.getConfirmedAt().toString(),
                        booking.getBookingNumber(),
                        booking.getTotalPrice(),
                        booking.getStatus()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Long ensureShowtime(String kopisId, String startAt) {
        LocalDateTime parsedStartAt = LocalDateTime.parse(startAt);
        Optional<Showtime> existingShowtime = showtimeRepository.findByKopisIdAndStartAt(kopisId, parsedStartAt);

        if (existingShowtime.isPresent()) {
            return existingShowtime.get().getId();
        } else {
            // Find the Show based on kopisId
            Show show = showRepository.findByKopisId(kopisId)
                    .orElseThrow(() -> new RuntimeException("Show not found for kopisId: " + kopisId));

            Showtime newShowtime = new Showtime();
            newShowtime.setKopisId(kopisId);
            newShowtime.setStartAt(parsedStartAt);
            newShowtime.setShow(show); // Set the Show object

            Showtime savedShowtime = showtimeRepository.save(newShowtime);
            return savedShowtime.getId();
        }
    }
}