package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.repository.BookingRepository;
import com.aquaticket.aquaticketback.booking.repository.ShowtimeRepository;
import com.aquaticket.aquaticketback.booking.repository.ShowRepository;
import com.aquaticket.aquaticketback.booking.repository.PerformanceRepository;
import com.aquaticket.aquaticketback.booking.domain.Showtime;
import com.aquaticket.aquaticketback.booking.domain.Show;
import com.aquaticket.aquaticketback.booking.domain.Performance;
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
    private final PerformanceRepository performanceRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, ShowtimeRepository showtimeRepository, ShowRepository showRepository, PerformanceRepository performanceRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.showRepository = showRepository;
        this.performanceRepository = performanceRepository;
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
            // 1. Find or Create Performance
            Performance performance = performanceRepository.findByKopisId(kopisId)
                    .orElseGet(() -> {
                        // Placeholder: In a real app, fetch details from Kopis API or pass from frontend
                        Performance newPerformance = new Performance();
                        newPerformance.setKopisId(kopisId);
                        newPerformance.setTitle("Unknown Performance"); // Placeholder
                        // newPerformance.setPosterUrl(...);
                        // newPerformance.setVenue(...);
                        return performanceRepository.save(newPerformance);
                    });

            // 2. Find or Create Show
            Show show = showRepository.findByKopisIdAndStartsAt(kopisId, parsedStartAt)
                    .orElseGet(() -> {
                        Show newShow = new Show();
                        newShow.setKopisId(kopisId);
                        newShow.setStartsAt(parsedStartAt);
                        newShow.setPerformance(performance);
                        return showRepository.save(newShow);
                    });

            // 3. Create Showtime
            Showtime newShowtime = new Showtime();
            newShowtime.setKopisId(kopisId);
            newShowtime.setStartAt(parsedStartAt);
            newShowtime.setShow(show);

            Showtime savedShowtime = showtimeRepository.save(newShowtime);
            return savedShowtime.getId();
        }
    }
}