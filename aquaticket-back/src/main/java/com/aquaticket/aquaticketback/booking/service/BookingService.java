package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.domain.*;
import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.dto.SeatAvailabilityDto;
import com.aquaticket.aquaticketback.booking.dto.SeatStatus;
import com.aquaticket.aquaticketback.booking.repository.*;
import com.aquaticket.aquaticketback.domain.User;
import com.aquaticket.aquaticketback.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final ShowRepository showRepository;
    private final ShowCreationService showCreationService;
    private final SeatRepository seatRepository;
    private final ReservationSeatRepository reservationSeatRepository;
    private final SeatLockRepository seatLockRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
                          ShowtimeRepository showtimeRepository, ShowRepository showRepository,
                          ShowCreationService showCreationService, SeatRepository seatRepository,
                          ReservationSeatRepository reservationSeatRepository, SeatLockRepository seatLockRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.showRepository = showRepository;
        this.showCreationService = showCreationService;
        this.seatRepository = seatRepository;
        this.reservationSeatRepository = reservationSeatRepository;
        this.seatLockRepository = seatLockRepository;
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
            Show show = showRepository.findByKopisId(kopisId)
                    .orElseGet(() -> showCreationService.createShowFromKopis(kopisId, parsedStartAt));

            Showtime newShowtime = new Showtime();
            newShowtime.setKopisId(kopisId);
            newShowtime.setStartAt(parsedStartAt);
            newShowtime.setShow(show);

            Showtime savedShowtime = showtimeRepository.save(newShowtime);
            return savedShowtime.getId();
        }
    }

    @Transactional(readOnly = true)
    public List<SeatAvailabilityDto> getSeatAvailability(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid showtime ID"));

        Venue venue = showtime.getShow().getPerformance().getVenue();
        List<Seat> allSeatsInVenue = seatRepository.findByVenue(venue);

        Set<Long> bookedSeatIds = reservationSeatRepository.findSeatIdsByShowtime(showtime.getId());
        Map<Long, SeatLock> lockedSeatsMap = seatLockRepository.findByShowAndLockedUntilAfter(showtime.getShow(), LocalDateTime.now())
                .stream().collect(Collectors.toMap(lock -> lock.getSeat().getId(), lock -> lock));

        return allSeatsInVenue.stream().map(seat -> {
            SeatStatus status;
            if (bookedSeatIds.contains(seat.getId())) {
                status = SeatStatus.TAKEN;
            } else if (lockedSeatsMap.containsKey(seat.getId())) {
                status = SeatStatus.LOCKED;
            } else {
                status = SeatStatus.AVAILABLE;
            }

            return SeatAvailabilityDto.builder()
                    .seatId(seat.getId())
                    .rowLabel(seat.getRowLabel())
                    .seatNo(seat.getSeatNo())
                    .price(seat.getPrice())
                    .status(status)
                    .build();
        }).collect(Collectors.toList());
    }
}